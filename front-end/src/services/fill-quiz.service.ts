import { Injectable } from "@angular/core";
import { Answer } from "src/models/question.model";

@Injectable({
    providedIn: 'root'
})
export class FillQuizService {
    quizId: number;
    selectedAnswers: Answer[] = new Array();

    constructor() {}

    setQuizId(quizId: number): void {
        this.quizId = quizId;
    }

    getQuizId(): number {
        return this.quizId;
    }

    addAnswerChoice(answer: Answer): void {
        this.selectedAnswers.push(answer);
    }

    getSelectedAnswers(): Answer[] {
        return this.selectedAnswers;
    }

    clearSelection(): void {
        this.quizId = undefined;
        while (this.selectedAnswers.length > 0)
            this.selectedAnswers.pop();
    }
}