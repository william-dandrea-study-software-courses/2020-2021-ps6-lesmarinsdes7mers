import { Component, OnInit } from "@angular/core";
import UserPrefsService from "../../../services/userprefs.service";
import {QuizService} from "../../../services/quiz.service";
import {Answer, Quiz} from "../../../models/quiz.model";
import {UserAndQuizService} from "../../../services/user-and-quiz.service";
import {MadedQuizzesModel, UserAndQuizModel, UserAnswer} from "../../../models/user-and-quiz.model";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
    selector: 'app-play-quiz',
    templateUrl: './play-quiz.component.html',
    styleUrls: ['./play-quiz.component.scss'],
})
export class PlayQuizComponent implements OnInit {


    private publicSession: boolean;
    private userSelected: User;

    public fontSizeMain: number;
    public fontSizeSecond: number;

    public currentQuiz: Quiz;
    public currentQuestion: number;

    public currentUser: User;

    public currentOneUserAndQuiz: UserAndQuizModel;
    public currentMadedQuizModel: MadedQuizzesModel;
    public userAnswers: UserAnswer[] = [];

    public currentSelectedAnswer: Answer;
    public numberOfGoodResponses: number;


    public backgroundColorForSelectedElements: string;


    constructor(private router: Router, private route: ActivatedRoute, private userPrefsService: UserPrefsService, private quizService: QuizService, private userAndQuizService: UserAndQuizService, private userService: UserService) {

        // === FONT SIZE
        this.userPrefsService.fontSize$.subscribe((size) => {
            this.fontSizeMain = size;
            this.fontSizeSecond = size - 10;
        });
        this.fontSizeMain = userPrefsService.getFontSize();
        this.fontSizeSecond = userPrefsService.getFontSize() - 10;


        // === QUIZ
        this.quizService.quizSelected$.subscribe((elem) => this.currentQuiz = elem);
        this.currentQuiz = this.quizService.getQuizSelected();
        console.log(this.currentQuiz);

        // === QUESTION
        this.currentQuestion = (this.currentQuiz) ? +this.currentQuiz.questions[0].id : 0;

        // === USER
        // this.userService.userSelected$.subscribe((elem) => this.currentUser = elem);
        // this.currentUser = this.userService.getUserSelected();

        // === USER AND QUIZ
        this.userAndQuizService.userAndQuizs$.subscribe();
        this.userAndQuizService.oneUserQuizzes$.subscribe((elem) => this.currentOneUserAndQuiz = elem);
        this.currentOneUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();


        // === RESTE
        this.backgroundColorForSelectedElements = 'white';
        this.currentSelectedAnswer = null;
        this.numberOfGoodResponses = 0;
        this.currentQuestion = 0;

    }

    ngOnInit(): void {

        this.userService.isPublicSessionAsObservable().subscribe(internIsPublic => {
            this.publicSession = internIsPublic;

            if (!internIsPublic) {
                this.userService.userSelected$.subscribe((user) => {
                    this.userSelected = user;
                });
            }
        });


    }



    goToNextQuestion(): void {


        if (this.currentSelectedAnswer && this.currentQuestion < this.inNumberOfQuestionsInQuiz() - 1) {

            if (this.currentSelectedAnswer.is_correct) {
                this.numberOfGoodResponses += 1;
            }
            this.userAnswers.push({id_question: this.currentQuestion, response_user: this.currentSelectedAnswer.id_answer });

            const indexUserAndQuiz = this.currentOneUserAndQuiz.played_quizzes.findIndex(elem => elem.id_quiz === this.currentQuiz.id);
            this.currentOneUserAndQuiz.played_quizzes[indexUserAndQuiz].user_answers = this.userAnswers;
            this.userAndQuizService.oneUserQuizzes$.next(this.currentOneUserAndQuiz);


            this.currentQuestion += 1;
        } else if (this.currentSelectedAnswer) {
            if (this.currentSelectedAnswer.is_correct) {
                this.numberOfGoodResponses += 1;
            }

            this.userAnswers.push({id_question: this.currentQuestion, response_user: this.currentSelectedAnswer.id_answer });
            const indexUserAndQuiz = this.currentOneUserAndQuiz.played_quizzes.findIndex(elem => elem.id_quiz === this.currentQuiz.id);
            this.currentOneUserAndQuiz.played_quizzes[indexUserAndQuiz].user_answers = this.userAnswers;

            this.currentOneUserAndQuiz.played_quizzes[indexUserAndQuiz].score_user = this.numberOfGoodResponses;

            // this.userAndQuizService.oneUserQuizzes$.next(this.currentOneUserAndQuiz);


            console.log(this.numberOfGoodResponses);
            this.router.navigate(['/quiz-result']).then(() => {

                this.quizService.setSelectedQuiz(this.currentQuiz.id);
                if (!this.publicSession) {
                    this.userService.setCurrentUser(this.userSelected.id);
                    this.userAndQuizService.setOneUserAndQuizElementForUser(this.currentOneUserAndQuiz, this.userSelected.id, this.currentQuiz.id);
                } else {
                    this.userAndQuizService.setOneUserAndQuizElementWhenPublic(this.currentOneUserAndQuiz);
                }

                console.log(this.currentQuiz);
                console.log(this.currentOneUserAndQuiz);
            });
        }

        this.currentSelectedAnswer = null;
    }

    selectedAnswer(answer: Answer): void {

        this.currentSelectedAnswer = answer;
    }




    isSelectedElement(answer: Answer): boolean {
        if (answer === this.currentSelectedAnswer){
            return true;
        }
        return false;
    }




    adaptPageToBigFont(): boolean {
        if (this.fontSizeMain >= 50) {
            return true;
        }
        return false;
    }




    inNumberOfQuestionsInQuiz(): number {
        return this.currentQuiz.questions.length;
    }

    inQuestionName(): string {
        return this.currentQuiz.questions[this.currentQuestion].question_name;
    }

    inQuestionAnswers(): Answer[] {
        return this.currentQuiz.questions[this.currentQuestion].answer;
    }

    isTextAnswer(): boolean {
        if (this.currentQuiz.questions[this.currentQuestion].type === 0) {return true;}
        return false;
    }


    quitQuiz(): void {
        this.router.navigate(['/homepage']).then(() => {
            if (!this.publicSession) {
                this.userService.setCurrentUser(this.userSelected.id);
                this.userAndQuizService.initializeUserAndQuiz(this.userSelected.id);
            }
        });
    }


}
