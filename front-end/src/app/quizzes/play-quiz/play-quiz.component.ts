import { Component, OnInit } from '@angular/core';
import UserPrefsService from '../../../services/user/userprefs.service';
import {QuizService} from '../../../services/quiz/quiz.service';
import {Answer, Quiz} from '../../../models/quiz.model';
import {UserAndQuizService} from '../../../services/user-and-quiz.service';
import {UserAndQuizModel, UserAnswer} from '../../../models/user-and-quiz.model';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-play-quiz',
    templateUrl: './play-quiz.component.html',
    styleUrls: ['./play-quiz.component.scss'],
})

/**
 * @verified : D'Andréa William - 7 may 2021
 */
export class PlayQuizComponent implements OnInit {

    private publicSession: boolean;

    private userSelected: User;

    public fontSizeMain: number;
    public fontSizeSecond: number;

    public currentQuiz: Quiz;
    public currentQuestion: number;

    public currentOneUserAndQuiz: UserAndQuizModel;
    public userAnswers: UserAnswer[] = [];

    public currentSelectedAnswer: Answer;
    public numberOfGoodResponses: number;

    constructor(private router: Router, private route: ActivatedRoute, private userPrefsService: UserPrefsService,
                private quizService: QuizService, private userAndQuizService: UserAndQuizService, private userService: UserService) {}


    public ngOnInit(): void {
        this.userPrefsService.getFontSizeAsObservable().subscribe((internSize) => {
            this.fontSizeMain = internSize;
            this.fontSizeSecond = internSize - 10;
        });

        this.userService.isPublicSessionAsObservable().subscribe(internIsPublic => {
            this.publicSession = internIsPublic;

            if (!internIsPublic) {
                this.userService.userSelected$.subscribe((user) => {
                    this.userSelected = user;
                });
            }
        });

        this.quizService.getQuizSelectedAsObservable().subscribe((internSelectedQuiz) => this.currentQuiz = internSelectedQuiz);
        this.currentQuiz = this.quizService.getQuizSelected();

        this.currentQuestion = (this.currentQuiz) ? +this.currentQuiz.questions[0].id : 0;

        this.userAndQuizService.getOneUserQuizzesAsObservable().subscribe((internOneUserAndQuiz) => {
            this.currentOneUserAndQuiz = internOneUserAndQuiz;
        });
        this.currentOneUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();

        this.currentSelectedAnswer = null;
        this.numberOfGoodResponses = 0;
        this.currentQuestion = 0;
    }

    /**
     * Méthode qui permet d'aller à la prochaine question ou d'aller sur la page de résultat si le quiz est fini
     */
    public goToNextQuestion(): void {

        if (this.currentSelectedAnswer && this.currentQuestion < this.inNumberOfQuestionsInQuiz() - 1) {
            // Si ce n'est pas la dernière question
            if (this.currentSelectedAnswer.is_correct) {
                this.numberOfGoodResponses += 1;
            }
            this.userAnswers.push({id_question: this.currentQuestion, response_user: this.currentSelectedAnswer.id_answer });

            const indexUserAndQuiz = this.currentOneUserAndQuiz.played_quizzes.findIndex(elem => elem.id_quiz === this.currentQuiz.id);
            this.currentOneUserAndQuiz.played_quizzes[indexUserAndQuiz].user_answers = this.userAnswers;
            this.userAndQuizService.oneUserQuizzes$.next(this.currentOneUserAndQuiz);

            this.currentQuestion += 1;

        } else if (this.currentSelectedAnswer) {
            // Si c'est pas la dernière question
            if (this.currentSelectedAnswer.is_correct) {
                this.numberOfGoodResponses += 1;
            }

            this.userAnswers.push({id_question: this.currentQuestion, response_user: this.currentSelectedAnswer.id_answer });
            const indexUserAndQuiz = this.currentOneUserAndQuiz.played_quizzes.findIndex(elem => elem.id_quiz === this.currentQuiz.id);
            this.currentOneUserAndQuiz.played_quizzes[indexUserAndQuiz].user_answers = this.userAnswers;

            this.currentOneUserAndQuiz.played_quizzes[indexUserAndQuiz].score_user = this.numberOfGoodResponses;

            // On navigue vers la parge de résultat
            this.router.navigate(['/quiz-result']).then(() => {

                this.quizService.setSelectedQuiz(this.currentQuiz.id);
                if (!this.publicSession) {
                    this.userService.setCurrentUser(this.userSelected.id);
                    this.userAndQuizService.setOneUserAndQuizElementForUser(this.currentOneUserAndQuiz, this.userSelected.id);
                } else {
                    this.userAndQuizService.setOneUserAndQuizElementWhenPublic(this.currentOneUserAndQuiz);
                }
            });
        }

        this.currentSelectedAnswer = null;
    }

    /**
     * Méthodes interne au HTML permettant de mettre un background différend pour les question séléctionnes
     */
    public selectedAnswer(answer: Answer): void {
        this.currentSelectedAnswer = answer;
    }

    public isSelectedElement(answer: Answer): boolean {
        return answer === this.currentSelectedAnswer;
    }

    /**
     * Méthode qui va retirer certains élements de la page si la taille d'écriture est trop grande
     */
    public adaptPageToBigFont(): boolean {
        return this.fontSizeMain >= 50;
    }

    /**
     * Informations sur le quiz / questions
     */
    public inNumberOfQuestionsInQuiz(): number {
        return this.currentQuiz.questions.length;
    }

    public inQuestionName(): string {
        return this.currentQuiz.questions[this.currentQuestion].question_name;
    }

    public inQuestionAnswers(): Answer[] {
        return this.currentQuiz.questions[this.currentQuestion].answer;
    }

    public isTextAnswer(): boolean {
        return this.currentQuiz.questions[this.currentQuestion].type === 0;
    }

    /**
     * Retour a la homepage avec reinitialisation des elements intern a ce quiz là
     */
    public quitQuiz(): void {
        this.router.navigate(['/homepage']).then(() => {
            if (!this.publicSession) {
                this.userService.setCurrentUser(this.userSelected.id);
                this.userAndQuizService.initializeUserAndQuiz(this.userSelected.id);
            }
        });
    }
}
