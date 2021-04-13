import { Component, OnInit } from "@angular/core";
import { Quiz, Difficulty, difficultyToText, Privacy } from "src/models/quiz.model";
import { UserAndQuizModel } from "src/models/user-and-quiz.model";
import { QuizService } from "src/services/quiz.service";
import { UserAndQuizService } from "src/services/user-and-quiz.service";

@Component({
    selector: 'app-anim-main-quizz-list',
    templateUrl: './anim-quiz-list.component.html',
    styleUrls: ['./anim-quiz-list.component.scss']
})
export class AnimMainQuizListComponent implements OnInit {

    quizList: Quiz[] = new Array();

    selectedQuiz: Quiz[] = new Array();
    
    /*  For statistic   */
    userAndQuizList : UserAndQuizModel[] = [];

    constructor (private quizService: QuizService,
        private userAndQuizService: UserAndQuizService) {

    }

    ngOnInit() {
        this.quizService.quizzes$.subscribe(quiz => {
            quiz.forEach(q => this.quizList.push(q));
        });
        this.userAndQuizService.userAndQuizs$.subscribe(stat => {
            stat.forEach(s => this.userAndQuizList.push(s));
        });
        console.log("stats : ", this.userAndQuizList);
    }

    translateDifficulty(difficulty: Difficulty):string {
        return difficultyToText(difficulty);
    }

    isSelectedKey(quiz: Quiz):boolean {
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

    isAllSelected():boolean {
        return this.selectedQuiz.length == this.quizList.length && this.selectedQuiz.length != 0;
    }

    selectQuiz(quiz: Quiz) {
        if (this.isSelectedKey(quiz)) {
            this.selectedQuiz.splice(this.selectedQuiz.indexOf(quiz), 1);
        }
        else {
            this.selectedQuiz.push(quiz);
        }
    }

    deleteSelection():void {
        this.selectedQuiz.forEach(quiz => {
            this.quizList.splice(this.quizList.indexOf(quiz), 1);
            this.quizService.deleteQuiz(quiz);
        });
        this.quizList.splice(0, this.quizList.length);
    }

    getVisibilityAccess(quiz: Quiz):string {
        if (quiz.privacy.is_public) {
            return "Publique";
        }
        else {
            return "Privé";
        }
    }

    getNbPlayedQuiz():number {
        var count = 0;

        for (let stat of this.userAndQuizList) {
            if (stat.played_quizzes != undefined) {
                count += stat.played_quizzes.length;
            }
        }

        return count;
    }

    getNbPlayer(quizId: number):number {
        return 0;
    }
}