import {Difficulty} from "./quiz.model";
import {Question, QuestionType} from "./question.model";


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
