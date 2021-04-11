import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";


@Component({
    templateUrl: './login-page.component.html',
    styleUrls: [ './login-page.component.scss' ],
    selector: 'app-login-page'
})
export default class LoginPageComponent implements OnInit{

    public userList: User[] = [];



    constructor(private router: Router, private userService: UserService) {
        this.userService.users$.subscribe((users) => {
            this.userList = users;
        });
    }


    ngOnInit(): void {}

    logInGuestMode(): void {
        this.router.navigate(['guest', 'config', 'fontsize']);
    }

    animateur(): void {
        this.router.navigate(['animateur']);
    }
}
