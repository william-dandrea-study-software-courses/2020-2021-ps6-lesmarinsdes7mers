import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { Handicap } from "src/models/handicap.enum";
import {DEFAULT_FONTSIZE, DEFAULT_HANDICAP} from "../../configs/configVariables";
import {User} from "../../models/user.model";

@Injectable({
    providedIn: 'root'
})
export default class UserPrefsService {

    public fontSize$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_FONTSIZE.START_FONTSIZE);
    public handicap$: BehaviorSubject<Handicap> = new BehaviorSubject<Handicap>(DEFAULT_HANDICAP);

    constructor() {}

    /**
     * Retourne un observable de la taille de la police
     */
    getFontSizeAsObservable(): Observable<number> {
        return this.fontSize$.asObservable();
    }

    /**
     * Retourne un observable de l'handicape
     */
    getHandicapAsObservable(): Observable<Handicap> {
        return this.handicap$.asObservable();
    }

    /**
     * Prévient les observateurs du changement de la valeur de l'handicape
     * @param handicap La nouvelle valeur de l'handicape
     */
    setHandicap(handicap: Handicap): void {
        this.handicap$.next(handicap);
    }

    /**
     * Prévient les observateurs du changement de la valeur de la taille de la police
     * @param size La nouvelle valeur de la taille de la police
     */
    setFontSize(size: number): void {
        this.fontSize$.next(size);
    }

    /**
     * Prévient les observateurs des handicapes et de la taille de la police de leurs nouvelles valeurs, venant d'un
     * utilisateur. La taille de la police sera celle choisi par défaut par l'utilisateur.
     * @param user Un utilisateur
     */
    initializePrefsForOneUser(user: User): void {
        this.setHandicap(user.handicap);

        if (user.size_font_configs.length > 0) {
            this.setFontSize(user.size_font_configs.filter(internConfig => internConfig.default === true)[0].size);
        }
    }

    /**
     * Prévient les observateurs de l'augmentation de la taille de la police de {@linkcode DEFAULT_FONTSIZE.PAS_FONTSIZE}
     */
    increaseFontSize(): void {
        let finalSize: number;
        this.getFontSizeAsObservable().subscribe((internFontSize) => {
            if (internFontSize + DEFAULT_FONTSIZE.PAS_FONTSIZE <= DEFAULT_FONTSIZE.MAX_FONTSIZE) {
                finalSize = internFontSize + DEFAULT_FONTSIZE.PAS_FONTSIZE;
            } else {
                finalSize = DEFAULT_FONTSIZE.MAX_FONTSIZE;
            }
        }).unsubscribe();
        this.fontSize$.next(finalSize);
    }

    /**
     * Prévient les observateurs de la diminution de la taille de la police de {@linkcode DEFAULT_FONTSIZE.PAS_FONTSIZE}
     */
    decreaseFontSize(): void {
        let finalSize: number;
        this.getFontSizeAsObservable().subscribe((internFontSize) => {
            if (internFontSize - DEFAULT_FONTSIZE.PAS_FONTSIZE >= DEFAULT_FONTSIZE.MIN_FONTSIZE) {
                finalSize = internFontSize - DEFAULT_FONTSIZE.PAS_FONTSIZE;
            } else {
                finalSize = DEFAULT_FONTSIZE.MIN_FONTSIZE;
            }
        }).unsubscribe();
        this.fontSize$.next(finalSize);
    }

}
