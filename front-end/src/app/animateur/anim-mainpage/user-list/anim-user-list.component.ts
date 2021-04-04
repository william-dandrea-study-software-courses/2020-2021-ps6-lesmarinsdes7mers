import { Component, OnInit } from "@angular/core";
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";

@Component({
    selector: 'app-anim-main-user-list',
    templateUrl: './anim-user-list.component.html',
    styleUrls: ['./anim-user-list.component.scss']
})
export class AnimMainUserListComponent implements OnInit {

    userList: User[] = new Array();

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.users$.subscribe(users => {
            users.forEach(user => this.userList.push(user));
        })
    }
}