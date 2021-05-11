import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz, Difficulty, difficultyToText } from 'src/models/quiz.model';
import { UserAndQuizModel } from 'src/models/user-and-quiz.model';
import { QuizService } from 'src/services/quiz/quiz.service';
import { UserAndQuizService } from 'src/services/user-and-quiz.service';

@Component({
    selector: 'app-anim-main-quizz-list',
    templateUrl: './anim-quiz-list.component.html',
    styleUrls: ['./anim-quiz-list.component.scss']
})
export class AnimMainQuizListComponent implements OnInit {

    quizList: Quiz[] = [];

    selectedQuiz: Quiz[] = [];

    /*  For statistic   */
    userAndQuizList: UserAndQuizModel[] = [];

    constructor(private quizService: QuizService,
                private userAndQuizService: UserAndQuizService,
                private router: Router) {

    }

    ngOnInit() {
        this.userAndQuizService.initializeUserAndQuiz(-1);
        this.quizService.quizzes$.subscribe(quiz => {
            this.quizList = quiz;
        });
        this.quizList = this.quizService.getAllQuizzes();
        this.userAndQuizService.userAndQuizs$.subscribe(stat => {
            this.userAndQuizList = [];
            stat.forEach(s => this.userAndQuizList.push(s));
        });


    }

    translateDifficulty(difficulty: Difficulty): string {
        return difficultyToText(difficulty);
    }

    isSelectedKey(quiz: Quiz): boolean {
        return this.selectedQuiz.filter(q => quiz.id == q.id).length > 0;
    }

    selectAll() {
        // Remove all
        this.selectedQuiz.splice(0, this.selectedQuiz.length);
        if (!this.isAllSelected()) {
            // Add all
            this.quizList.forEach(quiz => this.selectQuiz(quiz));
        }
    }

    isAllSelected(): boolean {
        return this.selectedQuiz.length == this.quizList.length && this.selectedQuiz.length != 0;
    }

    selectQuiz(quiz: Quiz, event?: Event) {
        event?.stopImmediatePropagation();
        if (this.isSelectedKey(quiz)) {
            this.selectedQuiz.splice(this.selectedQuiz.indexOf(quiz), 1);
        }
        else {
            this.selectedQuiz.push(quiz);
        }
    }

    deleteSelection(): void {
        this.selectedQuiz.forEach(quiz => {
            this.quizList.splice(this.quizList.indexOf(quiz), 1);
            this.quizService.deleteQuiz(quiz);
        });
        this.quizList.splice(0, this.quizList.length);
    }

    getVisibilityAccess(quiz: Quiz): string {
        if (quiz.privacy.is_public) {
            return 'Publique';
        }
        else {
            return 'Privé';
        }
    }

    getNbPlayedQuiz(): number {
        let count = 0;

        for (const stat of this.userAndQuizList) {
            if (stat.played_quizzes != undefined) {
                count += stat.played_quizzes.length;
            }
        }

        return count;
    }

    getNbPlayer(quizId: number): number {
        let count = 0;

        for (const stat of this.userAndQuizList) {
            if (stat.played_quizzes != undefined) {
                count += stat.played_quizzes.filter(quiz => quiz.id_quiz === quizId).length;
            }
        }

        return count;
    }

    private getAverageScoreForQuizAsNumber(quizId: number): number {
        let count = 0;

        for (const stat of this.userAndQuizList) {
            if (stat.played_quizzes != undefined) {
                for (const s of stat.played_quizzes.filter(quiz => quiz.id_quiz === quizId)) {
                    count += s.score_user;
                }
            }
        }

        const quiz = this.quizList.find(q => q.id === quizId);

        let score = count / this.getNbPlayer(quizId);

        score = Math.min(20, Math.max(0, score * 20 / quiz.questions.length));

        return score;
    }

    getAverageScoreForQuiz(quizId: number): string {
        let res = '' + this.getAverageScoreForQuizAsNumber(quizId);

        if (res.length >= res.indexOf('.') + 3) {
            res = res.substring(0, res.indexOf('.') + 3);
        }

        if (res === 'Na') {
            return '-';
        }

        return res;
    }

    getAverageScore(): string {
        let count = 0;

        for (const quiz of this.quizList) {

            const averageCount = this.getAverageScoreForQuizAsNumber(quiz.id);

            if (averageCount) {
                count += averageCount;
            }
        }

        const score = count / this.quizList.length;

        let res = '' + score;

        if (res.length >= res.indexOf('.') + 3) {
            res = res.substring(0, res.indexOf('.') + 3);
        }

        if (res === 'Na') {
            return '-';
        }

        return res;
    }

    getAverageNbPlayedQuizPerPerson(): string {
        let count = 0;
        let val = 0;

        for (const stat of this.userAndQuizList) {
            count++;
            val += stat.played_quizzes.length;
        }

        const score = val / count;

        let res = '' + score;

        if (res.length >= res.indexOf('.') + 3) {
            res = res.substring(0, res.indexOf('.') + 3);
        }

        return res;
    }

    editQuiz(quiz: Quiz) {
        this.router.navigate([ 'animateur', 'quizz-home-page', 'create-quizz', quiz.id ]);
    }
}
