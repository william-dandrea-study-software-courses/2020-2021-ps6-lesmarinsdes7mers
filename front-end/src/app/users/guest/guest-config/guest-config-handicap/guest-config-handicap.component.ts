import {Component, OnDestroy, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { Handicap } from '../../../../../models/handicap.enum'
import {QuizService} from "../../../../../services/quiz.service";
import UserPrefsService from "../../../../../services/userprefs.service";
import {Subscription} from "rxjs";
import {log} from "util";
import {Location} from "@angular/common";

@Component({
    templateUrl: './guest-config-handicap.component.html',
    styleUrls: ['./guest-config-handicap.component.scss'],
    selector: 'app-guest-config-handicap'
})
export default class GuestConfigHandicapComponent implements OnInit, OnDestroy {

    public handicap: Handicap;
    private handicapSubscription: Subscription;

    constructor(private userPrefsService: UserPrefsService, private location: Location, private router: Router) {}

    public ngOnInit(): void {
        this.handicapSubscription = this.userPrefsService.getHandicapAsObservable().subscribe(internHandicap => {
            this.handicap = internHandicap;
        });

        // Lorsque l'on arrive sur la page, on reload la page pour être sur que tout les services sont remis à 0
        this.location.subscribe(() => this.router.navigate(["/login"]).then(() => window.location.reload()));
    }

    public save(): void {
        this.router.navigate(['homepage']).then((r) => console.log('[GUEST-CONFIG-HANDICAP-PAGE] - Navigation to guest homepage : ' + String(r)));
    }


    public setProtanopie(): void {
        this.userPrefsService.setHandicap(Handicap.PROTANOPIE);
    }
    public isProtanopie(): boolean {
        return this.handicap === Handicap.PROTANOPIE;
    }


    public setDeuteranopie(): void {
        this.userPrefsService.setHandicap(Handicap.DEUTERANOPIE);
    }
    public isDeuteranopie(): boolean {
        return this.handicap === Handicap.DEUTERANOPIE;
    }

    /// Tritanopie methods
    public setTritanopie(): void {
        this.userPrefsService.setHandicap(Handicap.TRITANOPIE);
    }
    public isTritanopie(): boolean {
        return this.handicap === Handicap.TRITANOPIE;
    }

    /// LCS methods
    public setLowContrastSensi(): void {
        this.userPrefsService.setHandicap(Handicap.LOW_CONTRAST_SENSIBILITY);
    }
    public isLowContrastSensi(): boolean {
        return this.handicap === Handicap.LOW_CONTRAST_SENSIBILITY;
    }

    /// None methods
    public setNone(): void {
        this.userPrefsService.setHandicap(Handicap.NONE);
    }
    public isNone(): boolean {
        return this.handicap === Handicap.NONE;
    }

    public ngOnDestroy(): void {
        this.handicapSubscription.unsubscribe();
    }

}
