import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../../models/user.model';
import {usersGETAllUsers, usersGETOneUser} from '../../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  public users$: BehaviorSubject<User[]> = new BehaviorSubject([]);

  private userSelected: User;
  public userSelected$: Subject<User> = new Subject();

  private publicSession = false;
  public publicSession$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.publicSession);

  constructor(private http: HttpClient) {
    this.setAllUsers();
  }

  /**
   * Charge les utilisateurs, les met en cache et prévient les observateurs.
   */
  public setAllUsers(): void {
    this.getAllUsersFromDatabase().subscribe(internAllUsers => {
      this.users = internAllUsers.data;
      this.users$.next(internAllUsers.data);
    });
  }

  /**
   * Met un utilisateur comme sélectionné et prévient les observateurs de ce changement
   * @param userId L'utilisateur à mettre comme sélectionné
   */
  public setCurrentUser(userId: number): void {
    this.getOneUserFromDatabase(userId).subscribe(internUser => {
      this.userSelected = internUser.data;
      this.userSelected$.next(internUser.data);
    });
  }

  /**
   * Met la session comme étant publique ou privé, et prévient les observateurs du changement
   * @param isPublic Si la session est publique
   */
  public setPublicSession(isPublic: boolean): void {
    this.publicSession = isPublic;
    this.publicSession$.next(isPublic);
  }

  /**
   * Récupère tout les utilisateurs sur la base de données et renvoie le résultat.
   */
  private getAllUsersFromDatabase(): Observable<any> {
    return this.http.get<any>(usersGETAllUsers);
  }

  /**
   * Récupère un utilisateur sur la basse de données et renvoie le résultat
   * @param idUser L'id de l'utilisateur à récupérer
   */
  private getOneUserFromDatabase(idUser: number): Observable<any> {
    return this.http.get<any>(usersGETOneUser + String(idUser));
  }

  /**
   * Retourne un observateur des utilisateurs
   */
  public getAllUsersAsObservable(): Observable<User[]> {
    return this.users$;
  }

  /**
   * Retourne les utilisateurs chargés en cache
   */
  public getUsers(): User[] {
    return this.users;
  }

  /**
   * Retourne l'utilisateur chargé en cache
   * @param id L'id de l'utilisateur
   */
  public getUser(id: number): User {
    return this.users.find(value => value.id === id);
  }

  /**
   * Retourne un observateur sur l'utilisateur sélectionné
   */
  public getCurrentUserAsObservable(): Observable<User> {
    return this.userSelected$;
  }

  /**
   * Retourne l'utilisateur sélectionné
   */
  public getUserSelected(): User {
    return this.userSelected;
  }

  /**
   * Retourne un observateur sur le type de session
   */
  public isPublicSessionAsObservable(): Observable<boolean> {
    return this.publicSession$;
  }

  /**
   * Retourne true si la session en cours est publique, false sinon
   */
  public isPublicSession(): boolean {
    return this.publicSession;
  }

  /**
   * Ajoute un utilisateur dans le cache et prévient les observateurs
   * @param user L'utilisateur à ajouter
   */
  addUser(user: User): void {
    this.users.push(user);
    this.users$.next(this.users);
  }

  /**
   * Enlève un utilisateur dans le cache et prévient les observateurs
   * @param user L'utilisateur à enlever
   */
  deleteUser(user: User): void {
    this.users = this.users.filter(value => value.id !== user.id);
    this.users$.next(this.users);
  }
}
