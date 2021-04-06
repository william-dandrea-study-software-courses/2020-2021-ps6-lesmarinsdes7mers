import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {getDifficultyClass, difficultyToText, Quiz} from "../../../models/quiz.model";
import UserPrefsService from "../../../services/userprefs.service";

@Component({
    selector: 'app-quiz-intro',
    templateUrl: './quiz-intro.component.html',
    styleUrls: ['./quiz-intro.component.scss']
})
export class QuizIntroComponent implements OnInit {

    quiz: Quiz;
    difficultyToText = difficultyToText;
    getDifficultyClass = getDifficultyClass;

    constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, public userPref: UserPrefsService) {
        this.quizService.quizSelected$.subscribe(value => this.quiz = value);
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.quizService.setSelectedQuiz(+id);
        //this.difficulty = difficultyToText(this.quiz.difficulty);
        //this.quiz = this.quizService.
    }

    startQuiz(): void {
        this.router.navigate(['/play-quiz', this.quiz.id]);
    }

    homepage(): void {
        this.router.navigate(['/homepage']);
    }


}
