import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import UserPrefsService from 'src/services/userprefs.service';
import {Subscription} from 'rxjs';
import {Location} from "@angular/common";

@Component({
    templateUrl: './guest-config-fontsize.component.html',
    styleUrls: ['./guest-config-fontsize.component.scss'],
    selector: 'app-guest-config-fontsize'
})
export default class GuestConfigFontsizeComponent implements OnInit, OnDestroy  {

    public fontsize: number;
    private fontSizeSubscription: Subscription;

    constructor(private userPrefsService: UserPrefsService, private router: Router, private location: Location)  {}

    public ngOnInit(): void {
        this.fontSizeSubscription = this.userPrefsService.getFontSizeAsObservable().subscribe(internFontSize => {
            this.fontsize = internFontSize;
        });

        // Lorsque l'on arrive sur la page, on reload la page pour être sur que tout les services sont remis à 0
        this.location.subscribe(() => this.router.navigate(["/login"]).then(() => window.location.reload()));
    }

    public increaseSize(): void  {
        this.userPrefsService.increaseFontSize();
    }

    public decreaseSize(): void  {
        this.userPrefsService.decreaseFontSize();
    }

    public save(): void {
        this.router.navigate(['guest', 'config', 'handicap']).then((r) => console.log('[GUEST-CONFIG-FONTSIZE-PAGE] - Navigation to guest config handicap : ' + String(r)));
    }

    public ngOnDestroy(): void {
        this.fontSizeSubscription.unsubscribe();
    }
}
