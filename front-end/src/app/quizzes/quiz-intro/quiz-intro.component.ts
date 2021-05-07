import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {getDifficultyClass, difficultyToText, Quiz, Difficulty} from "../../../models/quiz.model";
import UserPrefsService from "../../../services/userprefs.service";
import {UserAndQuizService} from "../../../services/user-and-quiz.service";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {MadedQuizzesModel, UserAndQuizModel} from "../../../models/user-and-quiz.model";

@Component({
    selector: 'app-quiz-intro',
    templateUrl: './quiz-intro.component.html',
    styleUrls: ['./quiz-intro.component.scss']
})
export class QuizIntroComponent implements OnInit {

    public publicSession: boolean;

    public quizSelected: Quiz;
    public difficultyToText = difficultyToText;

    public userSelected: User;

    public fontSizeMain: number;
    public fontSizeSecond: number;

    public currentOneUserAndQuiz: UserAndQuizModel;

    constructor(private router: Router, private route: ActivatedRoute, public userService: UserService, private quizService: QuizService, public userPref: UserPrefsService, private userAndQuizService: UserAndQuizService) {

    }

    ngOnInit(): void {


        this.quizService.quizSelected$.subscribe((eachQuiz) => {
            this.quizSelected = eachQuiz;
        });


        this.userPref.fontSize$.subscribe((fontSiz) => {
            this.fontSizeMain = fontSiz;
            this.fontSizeSecond = fontSiz - 10;
        });

        this.userService.isPublicSessionAsObservable().subscribe(internIsPublic => {
            this.publicSession = internIsPublic;

            if (!internIsPublic) {
                this.userService.userSelected$.subscribe((user) => {
                    this.userSelected = user;
                });
            }
        });



        this.userAndQuizService.oneUserQuizzes$.subscribe((elem) => {
            this.currentOneUserAndQuiz = elem;
        });
    }

    generateNameDifficultyClass(): string {
        switch (this.quizSelected.difficulty) {
            case Difficulty.EASY: return 'easy';
            case Difficulty.MEDIUM: return 'medium';
            case Difficulty.HARD: return 'hard';
            case Difficulty.EXPERT: return 'expert';
        }
    }

    initializeTheOneUseQuizzes(): void {

        console.log(this.currentOneUserAndQuiz);

        if (!this.currentOneUserAndQuiz) {
            this.userAndQuizService.initializePublicOneUserAndQuiz();
        }

        const index = this.currentOneUserAndQuiz.played_quizzes.findIndex(pq => pq.id_quiz === this.quizSelected.id);

        // Si il n'y a pas l'élement dans le tableau, one le crée, sinon, il faut le remettre a zero
        if (index >= 0) {
            this.currentOneUserAndQuiz.played_quizzes[index].user_answers = [];
            this.currentOneUserAndQuiz.played_quizzes[index].score_user = 0;
            this.userAndQuizService.oneUserQuizzes$.next(this.currentOneUserAndQuiz);
        } else {
            const madedQuiz: MadedQuizzesModel = {id_quiz: this.quizSelected.id, score_user: 0, user_answers: []};
            this.currentOneUserAndQuiz.played_quizzes.push(madedQuiz);
            this.userAndQuizService.oneUserQuizzes$.next(this.currentOneUserAndQuiz);
        }
    }

    startQuiz(): void {
        this.initializeTheOneUseQuizzes();
        this.router.navigate(['/play-quiz']).then(() => {
            if (!this.publicSession) {
                this.userService.setCurrentUser(this.userSelected.id);
            }
        });
    }

    homepage(): void {
        console.log(this.userSelected);
        this.router.navigate(['/homepage/']).then(() => {
            if (!this.publicSession) {
                this.userService.setCurrentUser(this.userSelected.id);
                this.userAndQuizService.initializeUserAndQuiz(this.userSelected.id);
            }
        });
    }
}
