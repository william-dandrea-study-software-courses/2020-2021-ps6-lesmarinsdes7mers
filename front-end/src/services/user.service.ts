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

  public setAllUsers(): void {
    this.getAllUsersFromDatabase().subscribe(internAllUsers => {
      this.users = internAllUsers.data;
      this.users$.next(internAllUsers.data);
    });
  }

  public setCurrentUser(userId: number): void {
    this.getOneUserFromDatabase(userId).subscribe(internUser => {
      this.userSelected = internUser.data;
      this.userSelected$.next(internUser.data);
    });
  }

  public setPublicSession(isPublic: boolean): void {
    this.publicSession = isPublic;
    this.publicSession$.next(isPublic);
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

  public getUsers(): User[] {
    return this.users;
  }

  public getUser(id: number): User {
    return this.users.find(value => value.id === id);
  }

  public getCurrentUserAsObservable(): Observable<User> {
    return this.userSelected$;
  }

  public getUserSelected(): User {
    return this.userSelected;
  }

  public isPublicSessionAsObservable(): Observable<boolean> {
    return this.publicSession$;
  }

  public isPublicSession(): boolean {
    return this.publicSession;
  }
















  addUser(user: User): void {
    this.users.push(user);
    this.users$.next(this.users);
  }



  deleteUser(user: User): void {
    this.users = this.users.filter(value => value.id !== user.id);
    this.users$.next(this.users);
  }
}
