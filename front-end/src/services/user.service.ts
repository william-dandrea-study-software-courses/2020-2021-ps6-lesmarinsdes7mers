import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { User } from '../models/user.model';
import {serverUrl, httpOptionsBase, usersGETAllUsers, usersGETOneUser} from '../configs/server.config';
import {USER_LIST} from "../mocks/user-list.mock";
import {Quiz} from "../models/quiz.model";
import UserPrefsService from "./userprefs.service";
import {UserAndQuizService} from "./user-and-quiz.service";

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

  private userUrl = serverUrl + '/user';


  constructor(private http: HttpClient, private userPrefService: UserPrefsService, private userAndQuizService: UserAndQuizService) {
    this.setAllUsers();
  }


  private getAllUsersFromDatabase(): Observable<any> {
    return this.http.get<any>(usersGETAllUsers);
  }

  private getOneUserFromDatabase(idUser: number): Observable<any> {
    return this.http.get<any>(usersGETOneUser + String(idUser));
  }

  public getAllUsersAsObservable(): Observable<User[]> {
    return this.users$;
  }

  public getCurrentUserAsObservable(): Observable<User> {
    return this.userSelected$;
  }

  public isPublicSessionAsObservable(): Observable<boolean> {
    return this.publicSession$;
  }

  public setAllUsers(): void {
    this.getAllUsersFromDatabase().subscribe(internAllUsers => {
      this.users$.next(internAllUsers.data);
    });
  }

  public setCurrentUser(userId: number): void {
    this.getOneUserFromDatabase(userId).subscribe(internUser => {
      this.userSelected$.next(internUser.data);
    });
  }

  public setPublicSession(isPublic: boolean): void {
    this.publicSession$.next(isPublic);
  }












  /**
   * @deprecated
   */
  getPublicSession(): boolean {
    return this.publicSession;
  }

  /**
   * @deprecated
   */
  setSelectedUser(user: User): void {
    const urlUser = this.userUrl + '/' + String(user.id);
    this.http.get<any>(urlUser).subscribe((eachUser) => {
      this.userSelected = eachUser.data;
      this.userSelected$.next(eachUser.data);
    });
    if(user.size_font_configs.length > 0)
      this.userPrefService.setFontSize(user.size_font_configs.find(value => value.default)?.size || user.font_size);
    else
      this.userPrefService.setFontSize(user.font_size);
    this.userPrefService.setHandicap(user.handicap);
  }

  /**
   * @deprecated
   */
  getUserSelected(): User {
    return this.userSelected;
  }

  /**
   * @deprecated
   */
  addUser(user: User): void {
    this.users.push(user);
    this.users$.next(this.users);
  }


  /**
   * @deprecated
   */
  deleteUser(user: User): void {
    this.users = this.users.filter(value => value.id !== user.id);
    this.users$.next(this.users);
  }

  /**
   * @deprecated
   */
  getUser(id: number): User {
    return this.users.find(value => value.id === id);
  }

  /**
   * @deprecated
   */
  getUsers(): User[] {
    return this.users;
  }

}
