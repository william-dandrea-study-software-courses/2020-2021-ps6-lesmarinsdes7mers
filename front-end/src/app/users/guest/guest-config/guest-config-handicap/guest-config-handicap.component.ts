import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import UserPrefsService from "src/services/userprefs.service";
import { Handicap } from '../../../../../models/handicap.enum'

@Component({
    templateUrl: './guest-config-handicap.component.html',
    styleUrls: ['./guest-config-handicap.component.scss'],
    selector: 'app-guest-config-handicap'
})
export default class GuestConfigHandicapComponent implements OnInit {

    handicap: Handicap = Handicap.NONE;

    constructor(private userprefsService: UserPrefsService, private router: Router) {
        
    }

    ngOnInit(): void {
        this.handicap = this.userprefsService.getHandicap();
    }

    save(): void {
        this.userprefsService.setHandicap(this.handicap);
        console.log(this.userprefsService);
        this.router.navigate(['homepage']);
    }


    /// Protanopie methods
    setProtanopie(): void {
        this.handicap = Handicap.PROTANOPIE;
    }
    isProtanopie() {
        return this.handicap === Handicap.PROTANOPIE;
    }

    /// Deuteranopie methods
    setDeuteranopie() {
        this.handicap = Handicap.DEUTERANOPIE;
    }
    isDeuteranopie() {
        return this.handicap === Handicap.DEUTERANOPIE;
    }

    /// Tritanopie methods
    setTritanopie() {
        this.handicap = Handicap.TRITANOPIE;
    }
    isTritanopie() {
        return this.handicap === Handicap.TRITANOPIE;
    }

    /// LCS methods
    setLowContrastSensi() {
        this.handicap = Handicap.LOW_CONTRAST_SENSIBILITY;
    }
    isLowContrastSensi() {
        return this.handicap === Handicap.LOW_CONTRAST_SENSIBILITY;
    }

    /// None methods
    setNone() {
        this.handicap = Handicap.NONE;
    }
    isNone() {
        return this.handicap === Handicap.NONE;
    }

}
