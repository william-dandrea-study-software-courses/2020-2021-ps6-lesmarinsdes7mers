import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { Handicap } from "src/models/handicap.enum";
import {DEFAULT_FONTSIZE, DEFAULT_HANDICAP} from "../configs/configVariables";
import {User} from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export default class UserPrefsService {

    public fontSize$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_FONTSIZE.START_FONTSIZE);
    public handicap$: BehaviorSubject<Handicap> = new BehaviorSubject<Handicap>(DEFAULT_HANDICAP);

    constructor() {}

    getFontSizeAsObservable(): Observable<number> {
        return this.fontSize$.asObservable();
    }

    getHandicapAsObservable(): Observable<Handicap> {
        return this.handicap$.asObservable();
    }

    setHandicap(handicap: Handicap): void {
        this.handicap$.next(handicap);
    }

    setFontSize(size: number): void {
        this.fontSize$.next(size);
    }

    initializePrefsForOneUser(user: User): void {
        this.setHandicap(user.handicap);

        if (user.size_font_configs.length > 0) {
            this.setFontSize(user.size_font_configs.filter(internConfig => internConfig.default === true)[0].size);
        }
    }

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

    /**
     * @deprecated The method should not be used and replace by getFontSizeAsObservable()
     */
    getFontSize(): number {
        return DEFAULT_FONTSIZE.START_FONTSIZE;
    }

    /**
     * @deprecated The method should not be used and replace by getHandicapAsObservable()
     */
    getHandicap(): Handicap {
        return DEFAULT_HANDICAP;
    }



}
