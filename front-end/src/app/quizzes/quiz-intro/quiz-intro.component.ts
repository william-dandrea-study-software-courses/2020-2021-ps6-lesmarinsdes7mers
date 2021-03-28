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
    sizeFont: number;
    preSizeFont: number;
    difficulty = difficultyToText;

    interval;

    constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, private userPref: UserPrefsService) {
        userPref.$fontSize.subscribe(value => this.sizeFont = value);
        this.quizService.quizSelected$.subscribe(value => this.quiz = value);
        console.log(this.userPref.getHandicap());
    }

    ngOnInit(): void {
        this.sizeFont = this.userPref.getFontSize();
        this.preSizeFont = this.sizeFont;
        const id = this.route.snapshot.paramMap.get('id');
        this.quizService.setSelectedQuiz(+id);
        //this.difficulty = difficultyToText(this.quiz.difficulty);
        //this.quiz = this.quizService.
    }

    registerFontSize(): void {
        this.userPref.setFontSize(this.preSizeFont);
    }

    increaseSizeFont(): void {
        this.preSizeFont++;
        this.startTimer(false);
    }

    decreaseSizeFont(): void {
        if (this.preSizeFont > 1) {
            this.preSizeFont--;
            this.startTimer(true);
        }
    }

    startTimer(neg: boolean): void {
        this.interval = setInterval(() => {
            if (neg)
                this.preSizeFont -= 5;
            else
                this.preSizeFont += 5;
        }, 1000);
    }

    stopTimer(): void {
        clearInterval(this.interval);
    }

    startQuiz(): void {
        this.router.navigate(['/play-quiz', this.quiz.id, 'question', 0]);
    }

    homepage(): void {
        this.router.navigate(['/homepage']);
    }

    getDifficultyColorClass(): string {
        switch (this.quiz.difficulty) {
            case Difficulty.EASY:
                return "easy-background easy-fontcolor difficulty";
            case Difficulty.MEDIUM:
                return "medium-background medium-fontcolor difficulty";
            case Difficulty.HARD:
                return "hard-background hard-fontcolor difficulty";
            case Difficulty.EXPERT:
                return "expert-background expert-fontcolor difficulty";
        }
    }


}
