import { Injectable } from '@angular/core';
import {Answer} from '../../models/quiz.model';

@Injectable({
    providedIn: 'root'
})
export class FillQuizService {
    quizId: number;
    selectedAnswers: Answer[] = [];

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

    /**
     * Retourne les réponses données par l'utilisateur
     */
    getSelectedAnswers(): Answer[] {
        return this.selectedAnswers;
    }

    clearSelection(): void {
        this.quizId = undefined;
        while (this.selectedAnswers.length > 0)
            this.selectedAnswers.pop();
    }
}
