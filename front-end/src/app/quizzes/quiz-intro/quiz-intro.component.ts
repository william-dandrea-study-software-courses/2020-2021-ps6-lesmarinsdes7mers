import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {Difficulty, difficultyToText, Quiz} from "../../../models/quiz.model";
import UserPrefsService from "../../../services/userprefs.service";

@Component({
    selector: 'app-quiz-intro',
    templateUrl: './quiz-intro.component.html',
    styleUrls: ['./quiz-intro.component.scss']
})
export class QuizIntroComponent implements OnInit {

    quiz: Quiz;
    difficulty = difficultyToText;

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

    getDifficultyColorClass(): string {
        switch (this.quiz.difficulty) {
            case Difficulty.EASY:
                return "easy difficulty";
            case Difficulty.MEDIUM:
                return "medium difficulty";
            case Difficulty.HARD:
                return "hard difficulty";
            case Difficulty.EXPERT:
                return "expert difficulty";

            // Old value
            // return "easy-background easy-fontcolor difficulty";
        }
    }


}
