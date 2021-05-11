import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

enum HeaderMenuItem {
    QUIZ, USERS, SETTINGS
}

@Component({
    selector: 'app-anim-mainpage',
    templateUrl: './anim-mainpage.component.html',
    styleUrls: ['./anim-mainpage.component.scss']
})
export class AnimMainpageComponent implements OnInit {
    selectedHeaderMenuItem: HeaderMenuItem = HeaderMenuItem.QUIZ;

    constructor(private router: Router) {

    }

    ngOnInit () {
    }

    selectMenuItem (item: HeaderMenuItem): void {
        this.selectedHeaderMenuItem = item;
    }
    headerMenuToString (item: HeaderMenuItem): string {
        switch (item) {
            case HeaderMenuItem.QUIZ:
                return "Quizs";
            case HeaderMenuItem.USERS:
                return "Utilisateurs";
            case HeaderMenuItem.SETTINGS:
                return "Réglages";
            default:
                return "";
        }
    }

    mainHome() {
        this.router.navigate(["/login"])
    }

}
