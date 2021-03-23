import { Question } from './question.model';

enum Difficulty {
    EASY = "Facile", MEDIUM = "Moyen", HARD = "Difficile", EXPERT = "Expert"
}

export interface Quiz {
    id: number;
    name: string;
    difficulty: Difficulty;
    questions: Question[];
}
