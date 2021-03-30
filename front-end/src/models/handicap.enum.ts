export enum Handicap {
    NONE, PROTANOPIE, DEUTERANOPIE, TRITANOPIE, LOW_CONTRAST_SENSIBILITY
}

export function HandicapToString(handicap: Handicap) {
    switch(handicap) {
        case Handicap.NONE:
            return "Aucun"
        case Handicap.PROTANOPIE:
            return "Protanopie"
        case Handicap.DEUTERANOPIE:
            return "Deuteranopie"
        case Handicap.TRITANOPIE:
            return "Tritanopie"
        case Handicap.LOW_CONTRAST_SENSIBILITY:
            return "Contraste"
    }
}