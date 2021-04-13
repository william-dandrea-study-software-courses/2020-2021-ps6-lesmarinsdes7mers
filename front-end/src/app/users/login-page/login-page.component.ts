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
            users.forEach(user => this.userList.push(user))
        });

        this.userAndQuizService.oneUserQuizzes$.subscribe();
    }


    ngOnInit(): void {
        this.filterUserByString('');
    }

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

    filterUser(event: any) {
        var value = event.target.value;

        this.filterUserByString(value);
    }

    private filterUserByString (value: string) {
        console.log("filter value: ", value);

        this.userList.splice(0, this.userList.length);
        if (value.length < 1) {
            this.userService.users$.subscribe((users) => {
                users.forEach(user => {
                    if (!this.userList.includes(user)) {
                        this.userList.push(user);
                    }
                })
            });

            console.log("Bonjour");
        }
        else {
            this.userService.users$.subscribe((users) => {
                users.forEach(user => {
                    var fullName = user.name + " " + user.surname;
                    var revertFullName = user.surname + " " + user.name;
                    if (fullName.toLowerCase().includes(value.toLowerCase()) ||
                        revertFullName.toLowerCase().includes(value.toLowerCase())) {
                        this.userList.push(user);
                    }
                })
            });
        }

        console.log("users:", this.userList);
    }
}
