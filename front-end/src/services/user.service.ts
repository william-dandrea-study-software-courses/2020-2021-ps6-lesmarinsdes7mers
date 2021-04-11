import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {USER_LIST} from "../mocks/user-list.mock";
import {Quiz} from "../models/quiz.model";
import UserPrefsService from "./userprefs.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  public users$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  public userSelected$: Subject<User> = new Subject();

  private userUrl = serverUrl + '/user';
  private allUserUrl = this.userUrl + '/all';


  constructor(private http: HttpClient, private userPrefService: UserPrefsService) {


    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.http.get<any>(this.allUserUrl).subscribe((userList) => {
      this.users = userList.data;
      this.users$.next(this.users);
    });
  }

  setSelectedUser(user: User): void {
    const urlUser = this.userUrl + '/' + String(user.id);
    this.http.get<any>(urlUser).subscribe((eachUser) => {
      this.userSelected$.next(eachUser.data);
    });

    this.userPrefService.setFontSize(user.font_size);
    this.userPrefService.setHandicap(user.handicap);
  }


  addUser(user: User): void {
    this.users.push(user);
  }


  deleteUser(user: User): void {
    this.users = this.users.filter(value => value.id !== user.id);
  }

  getUser(id: number): User {
    return this.users.find(value => value.id === id);
  }

  getUsers(): User[] {
    return this.users;
  }

}
