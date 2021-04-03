import { Question } from './question.model';

export enum Difficulty {
    EASY, MEDIUM, HARD, EXPERT
}



export function difficultyToText(difficulty: Difficulty): string {
    switch (difficulty) {
        case Difficulty.EASY:
            return "Facile";
        case Difficulty.MEDIUM:
            return "Moyen";
        case Difficulty.HARD:
            return "Difficile";
        case Difficulty.EXPERT:
            return "Expert"
        default:
            return "Non définis";
    }
}

export interface Quiz {
    id: number;
    name: string;
    difficulty: Difficulty;
    questions: Question[];
}
