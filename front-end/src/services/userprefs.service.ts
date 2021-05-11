import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Handicap } from "src/models/handicap.enum";

@Injectable({
    providedIn: 'root'
})
export default class UserPrefsService {

    private fontSize = 60;
    private handicap: Handicap = Handicap.NONE;

    public fontSize$: Subject<number> = new Subject<number>();
    public handicap$: Subject<Handicap> = new Subject<Handicap>();


    constructor() {
    }

    setFontSize(size: number): void {
        this.fontSize = size;
        this.fontSize$.next(this.fontSize);
    }

    setHandicap(handicap: Handicap): void {
        this.handicap = handicap;
        this.handicap$.next(this.handicap);
    }

    getFontSize(): number {
        return this.fontSize;
    }

    getHandicap(): Handicap {
        return this.handicap;
    }
}
