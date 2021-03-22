import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import UserPrefsService from "src/services/userprefs.service";

@Component({
    templateUrl: './guest-config-fontsize.component.html',
    styleUrls: ['./guest-config-fontsize.component.scss'],
    selector: 'app-guest-config-fontsize'
})
export default class GuestConfigFontsizeComponent implements OnInit {

    fontsize: number = 60

    constructor(private userprefsService: UserPrefsService, private router: Router) {
        
    }


    increaseSize() {
        this.fontsize += this.fontsize < 70 ? 10 : 0
    }

    decreaseSize() {
        this.fontsize -= this.fontsize > 10 ? 10 : 0
    }

    ngOnInit() {
        this.fontsize = this.userprefsService.getFontSize()
    }

    save() {
        this.userprefsService.setFontSize(this.fontsize)
        this.router.navigate(['guest', 'config', 'handicap'])
    }
}