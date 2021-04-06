import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {USER_LIST} from "../mocks/user-list.mock";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*
   The list of user.
   */
  private users: User[] = USER_LIST;

  /*
   Observable which contains the list of the user.
   */
  /*public users$: BehaviorSubject<User[]>
    = new BehaviorSubject([]);*/

  /*public userSelected$: Subject<User> = new Subject();*/

  constructor() {}

  addUser(user: User): void {
    this.users.push(user);
  }

 /* setSelectedUser(userId: string): void {
    const urlWithId = this.userUrl + '/' + userId;
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected$.next(user);
    });
  }*/

  deleteUser(user: User): void {
    this.users = this.users.filter(value => value.id != user.id);
  }

  getUser(id: number): User {
    return this.users.find(value => value.id == id);
  }

  getUsers(): User[] {
    return this.users;
  }

}
