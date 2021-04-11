

export enum Difficulty {
    EASY, MEDIUM, HARD, EXPERT
}

export function getDifficultyClass(difficulty: Difficulty) {
    return {
        "easy": difficulty === Difficulty.EASY,
        "medium": difficulty === Difficulty.MEDIUM,
        "hard": difficulty === Difficulty.HARD,
        "expert": difficulty === Difficulty.EXPERT
    }
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

export enum QuestionType {
    TEXT, IMAGE
}

export interface Answer {

    id_answer: number;
    is_correct: boolean;
    data: string;
}

export interface Question {
    id: string;
    question_name: string;
    type: QuestionType;
    answers: Answer[];
}


export interface Privacy {
    is_public: boolean;
    users_access: number[];
}

export interface Quiz {
    id: number;
    name: string;
    difficulty: Difficulty;
    privacy: Privacy;
    questions: Question[];
}
