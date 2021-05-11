import {Injectable} from '@angular/core';
import {UserAndQuizModel} from "../models/user-and-quiz.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {
  userAndQuizzesGETAll,
  userAndQuizzesGETForOneUser,
  userAndQuizzesPOSTAddOneUserAndQuiz
} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserAndQuizService {

  private userAndQuizs: UserAndQuizModel[];
  public userAndQuizs$: BehaviorSubject<UserAndQuizModel[]> = new BehaviorSubject<UserAndQuizModel[]>([]);

  private oneUserQuizzes: UserAndQuizModel;
  public oneUserQuizzes$: Subject<UserAndQuizModel> = new Subject();

  constructor(private http: HttpClient) {}

  /**
   * Récupère sur la base de données le UserAndQuiz de l'utilisateur et de tout les autres
   * @param userId L'id de l'utilisateur pour lequel on veut récupérer son UserAndQuiz, ou -1 si on n'en veut pas
   */
  public initializeUserAndQuiz(userId: number): void {

    this.getAllUserAndQuizFromDatabase().subscribe(internUserAndQuizzes => {
      this.setUserAndQuizzes(internUserAndQuizzes.data);
    });

    if (userId !== -1) {
      this.getUserAndQuizForOneUserFromDatabase(userId).subscribe(internUserAndQuiz => {
        this.setOneUserAndQuiz(internUserAndQuiz.data);
      });
    }
  }

  /**
   * Met comme User celui par défaut. Il a comme id 1000.
   */
  public initializePublicOneUserAndQuiz(): void {
    this.setOneUserAndQuiz({id: 1000, id_user: 1000, played_quizzes: []});
  }

  /**
   * Récupère sur la base de données tout les UserAndQuiz.
   * @return L'observable de la requête
   */
  private getAllUserAndQuizFromDatabase(): Observable<any> {
    return this.http.get<any>(userAndQuizzesGETAll);
  }

  /**
   * Récupère sur la base de données l'UserAndQuiz d'un utilisateur.
   * @param userId L'id du l'utilisateur
   * @return L'observable de la requête
   */
  private getUserAndQuizForOneUserFromDatabase(userId: number): Observable<any> {
    return this.http.get<any>(userAndQuizzesGETForOneUser + String(userId));
  }

  /**
   * Met l'UserAndQuiz d'un utilisateur et prévient les observateurs du changement
   * @param internUserAndQuiz L'UserAndQuiz de l'utilisateur
   */
  private setOneUserAndQuiz(internUserAndQuiz: UserAndQuizModel): void {
    this.oneUserQuizzes = internUserAndQuiz;
    this.oneUserQuizzes$.next(internUserAndQuiz);
  }

  /**
   * Met l'UserAndQuiz des utilisateurs et prévient les observateurs du changement
   * @param internUserAndQuiz Les UserAndQuiz des utilisateurs
   */
  private setUserAndQuizzes(internUserAndQuiz: UserAndQuizModel[]): void {
    this.userAndQuizs = internUserAndQuiz;
    this.userAndQuizs$.next(internUserAndQuiz);
  }

  /**
   * Retourne un observable de l'UserAndQuiz de utilisateur initialisé avec {@linkcode initializeUserAndQuiz} ou
   * {@linkcode initializePublicOneUserAndQuiz}
   * @return l'observable de l'UserAndQuiz de l'utilisateur
   */
  public getOneUserQuizzesAsObservable(): Observable<UserAndQuizModel> {
    return this.oneUserQuizzes$;
  }

  /**
   * Retourne l'UserAndQuiz de l'utilisateur initialisé avec {@linkcode initializeUserAndQuiz} ou {@linkcode initializePublicOneUserAndQuiz}
   * @return l'UserAndQuiz de l'utilisateur
   */
  getOneUserQuizzes(): UserAndQuizModel {
    return this.oneUserQuizzes;
  }

  /**
   * L'observable des UserAndQuiz des utilisateurs initialisés avec {@linkcode initializeUserAndQuiz}
   * @return l'observable des UserAndQuiz des utilisateurs
   */
  public getUserAndQuizzesAsObservable(): Observable<UserAndQuizModel[]> {
    return this.userAndQuizs$;
  }

  /**
   * Retourne les UserAndQuiz en cache des utilisateurs initialisés avec {@linkcode initializeUserAndQuiz}
   * @return Les UserAndQuiz des utilisateurs
   */
  public getUserAndQuizs(): UserAndQuizModel[] {
    return this.userAndQuizs;
  }

  /**
   * Met à jour l'UserAndQuiz de l'utilisateur sur ce service et sur la base de données
   * @param userAndQuiz L'UserAndQuiz de l'utilisateur
   * @param idUser L'id de l'utilisateur
   */
  public setOneUserAndQuizElementForUser(userAndQuiz: UserAndQuizModel, idUser: number): void {
    this.setOneUserAndQuizElementWhenPublic(userAndQuiz);
    this.http.put<UserAndQuizModel>(userAndQuizzesPOSTAddOneUserAndQuiz + String(idUser), userAndQuiz).subscribe(data => {});
  }

  /**
   * Met à jour l'UserAndQuiz de l'utilisateur sur ce service
   * @param userAndQuiz L'UserAndQuiz de l'utilisateur
   */
  public setOneUserAndQuizElementWhenPublic(userAndQuiz: UserAndQuizModel): void {
    this.oneUserQuizzes = userAndQuiz;
    this.oneUserQuizzes$.next(userAndQuiz);
  }

}
