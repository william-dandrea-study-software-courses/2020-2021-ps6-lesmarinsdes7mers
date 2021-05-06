import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import UserPrefsService from 'src/services/userprefs.service';
import {Subscription} from 'rxjs';

@Component({
    templateUrl: './guest-config-fontsize.component.html',
    styleUrls: ['./guest-config-fontsize.component.scss'],
    selector: 'app-guest-config-fontsize'
})
export default class GuestConfigFontsizeComponent implements OnInit, OnDestroy  {

    public fontsize: number;
    private fontSizeSubscription: Subscription;

    constructor(private userPrefsService: UserPrefsService, private router: Router)  {}

    public ngOnInit(): void {
        this.fontSizeSubscription = this.userPrefsService.getFontSizeAsObservable().subscribe(internFontSize => {
            this.fontsize = internFontSize;
        });
    }

    public increaseSize(): void  {
        this.userPrefsService.increaseFontSize();
    }

    public decreaseSize(): void  {
        this.userPrefsService.decreaseFontSize();
    }

    public save(): void {
        console.log(this.fontsize);
        this.fontSizeSubscription = this.userPrefsService.getFontSizeAsObservable().subscribe(internFontSize => {
            console.log(internFontSize);
        });
        this.router.navigate(['guest', 'config', 'handicap']);
    }

    public ngOnDestroy(): void {
        this.fontSizeSubscription.unsubscribe();
    }
}
