import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Handicap } from '../../../../../models/handicap.enum';
import UserPrefsService from '../../../../../services/userprefs.service';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';

@Component({
    templateUrl: './guest-config-handicap.component.html',
    styleUrls: ['./guest-config-handicap.component.scss'],
    selector: 'app-guest-config-handicap'
})

/**
 * @verified : D'Andréa William - 7 may 2021
 */

export default class GuestConfigHandicapComponent implements OnInit, OnDestroy {

    private handicapSubscription: Subscription;
    public handicap: Handicap;

    constructor(private userPrefsService: UserPrefsService, private location: Location, private router: Router) {}

    public ngOnInit(): void {
        this.handicapSubscription = this.userPrefsService.getHandicapAsObservable().subscribe(internHandicap => {
            this.handicap = internHandicap;
        });

        // Lorsque l'on arrive sur la page, on reload la page pour être sur que tout les services sont remis à 0
        this.location.subscribe(() => this.router.navigate(['/login']).then(() => window.location.reload()));
    }

    /**
     * Méthodes qui permettent le changement du handicap dans le service
     */
    public setProtanopie(): void {
        this.userPrefsService.setHandicap(Handicap.PROTANOPIE);
    }

    public setDeuteranopie(): void {
        this.userPrefsService.setHandicap(Handicap.DEUTERANOPIE);
    }

    public setTritanopie(): void {
        this.userPrefsService.setHandicap(Handicap.TRITANOPIE);
    }

    public setLowContrastSensibility(): void {
        this.userPrefsService.setHandicap(Handicap.LOW_CONTRAST_SENSIBILITY);
    }

    public setNone(): void {
        this.userPrefsService.setHandicap(Handicap.NONE);
    }

    /**
     * Méthodes internes qui ne servent qu'au design de l'interface (changement du background des boutons en
     * noir ou blanc selon si l'utilisateur a cliqué dessus ou non)
     */
    public isProtanopie(): boolean {
        return this.handicap === Handicap.PROTANOPIE;
    }

    public isDeuteranopie(): boolean {
        return this.handicap === Handicap.DEUTERANOPIE;
    }

    public isTritanopie(): boolean {
        return this.handicap === Handicap.TRITANOPIE;
    }

    public isLowContrastSensibility(): boolean {
        return this.handicap === Handicap.LOW_CONTRAST_SENSIBILITY;
    }

    public isNone(): boolean {
        return this.handicap === Handicap.NONE;
    }


    /**
     * Navigation à la HomePage
     */
    public save(): void {
        this.router.navigate(['homepage']).then((r) => console.log('[GUEST-CONFIG-HANDICAP-PAGE] - ' +
            'Navigation to guest homepage : ' + String(r)));
    }

    public ngOnDestroy(): void {
        this.handicapSubscription.unsubscribe();
    }

}
