import {Difficulty, Question} from "./quiz.model";


export enum Visibility {
    PUBLIC, PRIVATE
}

export interface QuizCreationModel {
    id: number;
    name: string;
    difficulty: Difficulty;
    visibility: Visibility;
    questions: Question[];
}
