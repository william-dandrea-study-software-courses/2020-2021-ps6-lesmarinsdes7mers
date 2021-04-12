import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {getDifficultyClass, difficultyToText, Quiz, Difficulty} from "../../../models/quiz.model";
import UserPrefsService from "../../../services/userprefs.service";

@Component({
    selector: 'app-quiz-intro',
    templateUrl: './quiz-intro.component.html',
    styleUrls: ['./quiz-intro.component.scss']
})
export class QuizIntroComponent implements OnInit {

    public quizSelected: Quiz;
    public difficultyToText = difficultyToText;
    public getDifficultyClass = getDifficultyClass;

    public fontSizeMain: number;
    public fontSizeSecond: number;

    constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, public userPref: UserPrefsService) {

        this.quizService.quizSelected$.subscribe((eachQuiz) => {
            this.quizSelected = eachQuiz;
        });

        this.userPref.fontSize$.subscribe((fontSiz) => {
            this.fontSizeMain =  Math.max(50, fontSiz);
            this.fontSizeSecond = Math.max(30, fontSiz - 10);
        });



        console.log(this.fontSizeMain);
        console.log(this.fontSizeSecond);
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.quizService.setSelectedQuiz(+id);

    }


    generateNameDifficultyClass(): string {
        switch (this.quizSelected.difficulty) {
            case Difficulty.EASY: return 'easy';
            case Difficulty.MEDIUM: return 'medium';
            case Difficulty.HARD: return 'hard';
            case Difficulty.EXPERT: return 'expert';

        }
    }

    startQuiz(): void {
        this.router.navigate(['/play-quiz', this.quizSelected.id]);
    }

    homepage(): void {
        this.router.navigate(['/homepage']);
    }


}
