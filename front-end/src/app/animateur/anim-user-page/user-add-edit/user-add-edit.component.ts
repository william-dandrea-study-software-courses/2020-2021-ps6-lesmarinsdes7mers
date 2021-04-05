import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  user: User;
  birthday: string;

  constructor(private path: ActivatedRoute, private users: UserService, private dateFormatter: DatePipe) {  }

  ngOnInit(): void {
    let userId = +this.path.snapshot.paramMap.get('id-user');
    this.user = this.users.getUser(userId);
    this.birthday = this.dateFormatter.transform(this.user.birthday, "dd/MM/yyyy");
  }

}
