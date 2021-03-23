export enum QuestionType {
    TEXT, IMAGE
}

export interface Answer {
    is_correct: boolean;
    data: string;
}

export interface Question {
    id: string;
    question_name: string;
    type: QuestionType;
    answers: Answer[];
}
