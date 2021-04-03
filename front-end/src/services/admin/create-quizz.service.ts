import {Injectable} from "@angular/core";
import {Difficulty} from "src/models/quiz.model";
import {Answer, Question, QuestionType} from "../../models/question.model";
import {QuizCreationModel, Visibility} from "../../models/quiz-creation.model";

@Injectable({
    providedIn: 'root'
})

export class CreateQuizzService {

    createQuiz: QuizCreationModel;

    constructor() {}

    addQuiz(quiz: QuizCreationModel): void {
        this.createQuiz = quiz;
    }

    deleteQuiz(): void {
        this.createQuiz = null;
    }



}
