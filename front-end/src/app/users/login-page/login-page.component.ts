import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {UserAndQuizService} from "../../../services/user-and-quiz.service";


@Component({
    templateUrl: './login-page.component.html',
    styleUrls: [ './login-page.component.scss' ],
    selector: 'app-login-page'
})
export default class LoginPageComponent implements OnInit{

    public userList: User[] = [];



    constructor(private router: Router, private userService: UserService, private userAndQuizService: UserAndQuizService) {
        this.userService.users$.subscribe((users) => {
            this.userList = users;
        });

        this.userAndQuizService.oneUserQuizzes$.subscribe();
    }


    ngOnInit(): void {}

    logInGuestMode(): void {
        this.router.navigate(['guest', 'config', 'fontsize']);
    }

    animateur(): void {
        this.router.navigate(['animateur']);
    }

    onUserClick(event: User): void {


        this.userService.setSelectedUser(event);
        this.userAndQuizService.setOneUserQuizzes(event);
        const url: string = '/homepage/' + String(event.id);
        this.router.navigate([url]);


    }
}
