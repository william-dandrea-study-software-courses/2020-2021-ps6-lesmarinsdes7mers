import { Question } from './question.model';

enum Difficulty {
    EASY, MEDIUM, HARD, EXPERT
}

export interface Quiz {
    id: number;
    name: string;
    difficulty: Difficulty;
    questions: Question[];
}
