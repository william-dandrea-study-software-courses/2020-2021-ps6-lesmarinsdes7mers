import {Injectable} from "@angular/core";
import {QuizCreationModel} from "../../models/quiz-creation.model";

@Injectable({
    providedIn: 'root'
})

export class CreateQuizzService {

    createQuiz: QuizCreationModel;

    constructor() {}

    addQuiz(quiz: QuizCreationModel): void {
        this.createQuiz.questions = quiz.questions;
        this.createQuiz.visibility = quiz.visibility;
        this.createQuiz.name = quiz.name;
        this.createQuiz.id = 10;
    }

    deleteQuiz(): void {
        this.createQuiz = null;
    }



}
