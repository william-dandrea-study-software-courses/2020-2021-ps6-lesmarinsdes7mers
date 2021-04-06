import { Component, OnInit } from "@angular/core";
import { Quiz, Difficulty, difficultyToText } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-anim-main-quizz-list',
    templateUrl: './anim-quiz-list.component.html',
    styleUrls: ['./anim-quiz-list.component.scss']
})
export class AnimMainQuizListComponent implements OnInit {

    quizList: Quiz[] = new Array();

    selectedQuiz: Quiz[] = new Array();

    constructor (private quizService: QuizService) {

    }

    ngOnInit() {
        this.quizService.quizzes$.subscribe(quiz => {
            quiz.forEach(q => this.quizList.push(q));
        })
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
        return this.selectedQuiz.length == this.quizList.length;
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
            this.quizService.deleteQuiz(quiz);
        })
    }
}