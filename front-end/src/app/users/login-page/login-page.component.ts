import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {UserAndQuizService} from '../../../services/user-and-quiz.service';
import {Location} from '@angular/common';
import {Subscription} from "rxjs";


@Component({
    templateUrl: './login-page.component.html',
    styleUrls: [ './login-page.component.scss' ],
    selector: 'app-login-page'
})
export default class LoginPageComponent implements OnInit, OnDestroy{

    private userList: User[] = [];
    private userListSubscription: Subscription;

    public dispUserList: User[] = [];


    public constructor(private router: Router, private location: Location, private userService: UserService, private userAndQuizService: UserAndQuizService) {}

    public ngOnInit(): void {

        // Nous récupérons la liste de users
        this.userListSubscription = this.userService.getAllUsersAsObservable().subscribe(internAllUsers => {
            this.userList = internAllUsers;
            this.dispUserList = internAllUsers;
        });

        // Lorsque l'on arrive sur la page, on reload la page pour être sur que tout les services sont remis à 0
        this.location.subscribe(() => window.location.reload());
    }



    public logInGuestMode(): void {
        // On affecte le statut de la session au "mode invité"
        this.userService.setPublicSession(true);

        this.router.navigate(['guest', 'config', 'fontsize']).then(r =>
            console.log('[LOGIN-PAGE] - Navigation to guest page : ' + String(r))
        );
    }


    public animateur(): void {
        this.router.navigate(['animateur']).then(r => console.log('[LOGIN-PAGE] - Navigation to animateur page : ' + String(r)));
    }

    public onUserClick(event: User): void {

        // On désactive la session en "mode invité"
        this.userService.setPublicSession(false);

        // On affecte l'utilisateur courant
        this.userService.setCurrentUser(event.id);

        console.log('[LOGIN-PAGE] - User selected : \n ID : ' + String(event.id)
            + '\n NAME : ' + String(event.name) +  + ' ' + String(event.surname)
            + '\n HANDICAP : ' + String(event.handicap));

        this.router.navigate(['/homepage']).then(r =>
            console.log('[LOGIN-PAGE] - Navigate to homePage for user ' + String(event.id) + ' : ' + String(r)));
    }


    public filterUser(event: any): void {
        this.filterUserByString(event.target.value);
    }


    private filterUserByString(value: string): void {

        if (value.length === 0) {
            this.dispUserList = this.userList;
        } else {
            this.dispUserList = [];

            this.userList.forEach(user => {
                const fullName = user.name + ' ' + user.surname;
                const revertFullName = user.surname + ' ' + user.name;
                if (fullName.toLowerCase().includes(value.toLowerCase()) ||
                    revertFullName.toLowerCase().includes(value.toLowerCase())) {
                    this.dispUserList.push(user);
                }
            });

        }
    }

    public ngOnDestroy(): void {
        this.userListSubscription.unsubscribe();
    }
}
