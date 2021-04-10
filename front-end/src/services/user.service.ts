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


  private users: User[] = USER_LIST;

  constructor() {}

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
