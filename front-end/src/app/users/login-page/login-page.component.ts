import { Component } from "@angular/core";
import { Router } from "@angular/router";


@Component({
    templateUrl: './login-page.component.html',
    styleUrls: [ './login-page.component.scss' ],
    selector: 'app-login-page'
})
export default class LoginPageComponent {
    constructor(private router: Router) {

    }

    logInGuestMode() {
        this.router.navigate(['guest', 'config', 'fontsize'])
    }
}