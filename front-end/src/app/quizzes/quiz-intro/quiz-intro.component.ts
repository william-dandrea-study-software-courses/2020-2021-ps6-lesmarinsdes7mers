import {Component,  OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {difficultyToText, Quiz, Difficulty} from '../../../models/quiz.model';
import UserPrefsService from '../../../services/userprefs.service';
import {UserAndQuizService} from '../../../services/user-and-quiz.service';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {MadedQuizzesModel, UserAndQuizModel} from '../../../models/user-and-quiz.model';

@Component({
    selector: 'app-quiz-intro',
    templateUrl: './quiz-intro.component.html',
    styleUrls: ['./quiz-intro.component.scss']
})

/**
 * @verified : D'Andréa William - 7 May 2021
 */

export class QuizIntroComponent implements OnInit {

    private publicSession: boolean;

    public quizSelected: Quiz;
    public difficultyToText = difficultyToText;

    public userSelected: User;

    public fontSizeMain: number;
    public fontSizeSecond: number;

    public currentOneUserAndQuiz: UserAndQuizModel;

    constructor(private router: Router, private route: ActivatedRoute, public userService: UserService,
                private quizService: QuizService, public userPref: UserPrefsService, private userAndQuizService: UserAndQuizService) {}

    public ngOnInit(): void {
        this.quizService.getQuizSelectedAsObservable().subscribe((internQuizSelected) => {
            this.quizSelected = internQuizSelected;
        });

        this.userPref.getFontSizeAsObservable().subscribe((internFontSize) => {
            this.fontSizeMain = internFontSize;
            this.fontSizeSecond = internFontSize - 10;
        });

        this.userService.isPublicSessionAsObservable().subscribe(internIsPublic => {
            this.publicSession = internIsPublic;

            if (!internIsPublic) {
                this.userService.userSelected$.subscribe((internUser) => {
                    this.userSelected = internUser;
                });
            }
        });

        this.userAndQuizService.getOneUserQuizzesAsObservable().subscribe((internOneUserQuizzes) => {
            this.currentOneUserAndQuiz = internOneUserQuizzes;
        });
    }

    /**
     * Méthode interne HTML permettant de générer le nom de la difficulté
     */
    public generateNameDifficultyClass(): string {
        switch (this.quizSelected.difficulty) {
            case Difficulty.EASY: return 'easy';
            case Difficulty.MEDIUM: return 'medium';
            case Difficulty.HARD: return 'hard';
            case Difficulty.EXPERT: return 'expert';
        }
    }

    /**
     * Lancement du quiz
     * => Initialisation du userAndQuiz par un nouveau userAndQuiz (ce qui implique la surcharge d'un ancien
     *    userAndQuiz)
     */
    public startQuiz(): void {
        this.router.navigate(['/play-quiz']).then(() => {
            if (!this.publicSession) {
                this.userService.setCurrentUser(this.userSelected.id);
            }
            this.quizService.setSelectedQuiz(this.quizSelected.id);
            this.initializeTheOneUseQuizzes();
        });
    }

    private initializeTheOneUseQuizzes(): void {
        if (!this.currentOneUserAndQuiz) {
            this.userAndQuizService.initializePublicOneUserAndQuiz();
        }

        const index = this.currentOneUserAndQuiz.played_quizzes.findIndex(pq => pq.id_quiz === this.quizSelected.id);

        // Si il n'y a pas l'élément dans le tableau, one le crée, sinon, il faut le remettre a zero
        if (index >= 0) {
            this.currentOneUserAndQuiz.played_quizzes[index].user_answers = [];
            this.currentOneUserAndQuiz.played_quizzes[index].score_user = 0;
            this.userAndQuizService.oneUserQuizzes$.next(this.currentOneUserAndQuiz);
        } else {
            const madeQuiz: MadedQuizzesModel = {id_quiz: this.quizSelected.id, score_user: 0, user_answers: []};
            this.currentOneUserAndQuiz.played_quizzes.push(madeQuiz);
            this.userAndQuizService.oneUserQuizzes$.next(this.currentOneUserAndQuiz);
        }
    }

    /**
     * Navigation vers la homepage et remise à 0 de l'userAndQuiz
     */
    public homepage(): void {
        this.router.navigate(['/homepage']).then(() => {
            if (!this.publicSession) {
                this.userService.setCurrentUser(this.userSelected.id);
                this.userAndQuizService.initializeUserAndQuiz(this.userSelected.id);
            }
        });
    }
}
