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
}