import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
    templateUrl: './login-page.component.html',
    styleUrls: [ './login-page.component.scss' ],
    selector: 'app-login-page'
})

/**
 * @verified : D'Andréa William - 7 may 2021
 */

export default class LoginPageComponent implements OnInit, OnDestroy{

    private userList: User[] = [];
    private userListSubscription: Subscription;
    public dispUserList: User[] = [];

    public constructor(private router: Router, private location: Location, private userService: UserService) {}

    public ngOnInit(): void {
        // Nous récupérons la liste de users
        this.userListSubscription = this.userService.getAllUsersAsObservable().subscribe(internAllUsers => {
            this.userList = internAllUsers;
            this.dispUserList = internAllUsers;
        });

        // Lorsque l'on arrive sur la page, on reload la page pour être sur que tout les services sont remis à 0
        this.location.subscribe(() => window.location.reload());
    }

    /**
     * Méthode appelé au moment du clic sur le bouton "Mode invité"
     * => Navigation sur la page de configuration de la taille du mode invité
     */
    public logInGuestMode(): void {
        // On affecte le statut de la session au "mode invité"
        this.userService.setPublicSession(true);

        this.router.navigate(['guest', 'config', 'fontsize']).then(r =>
            console.log('[LOGIN-PAGE] - Navigation to guest page : ' + String(r))
        );
    }

    /**
     * Méthode appelé au moment du clic sur le bouton "Animateur"
     * => Navigation sur la page animateur
     */
    public animateur(): void {
        this.router.navigate(['animateur']).then(r => console.log('[LOGIN-PAGE] - Navigation to animateur page : ' + String(r)));
    }

    /**
     * Méthode appelé au moment ou l'utilisateur clic sur la flashcard liée à son profil
     * => Navigation vers la homepage liée a l'utilisateur sélectionné
     * @param user : utilisateur sur lequel l'utilisateur a cliqué
     */
    public onUserClick(user: User): void {

        // On désactive la session en "mode invité"
        this.userService.setPublicSession(false);

        // On affecte l'utilisateur courant
        this.userService.setCurrentUser(user.id);

        console.log('[LOGIN-PAGE] - User selected : \n ID : ' + String(user.id)
            + '\n NAME : ' + String(user.name) +  + ' ' + String(user.surname)
            + '\n HANDICAP : ' + String(user.handicap));

        this.router.navigate(['/homepage']).then(r =>
            console.log('[LOGIN-PAGE] - Navigate to homePage for user ' + String(user.id) + ' : ' + String(r)));
    }

    /**
     * Méthode appelé au moment ou l'utilisateur ajoute du texte dans le field de filtre
     * @param event : l'event contenant la chaine de caractère
     */
    public filterUser(event: any): void {
        this.filterUserByString(event.target.value);
    }

    /**
     * Méthode qui permet de filtrer la liste d'utilisateur lorsque l'utilisateur écrit du texte dans le field du filtre
     * @param value : string que doit contenir les réponses
     */
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
