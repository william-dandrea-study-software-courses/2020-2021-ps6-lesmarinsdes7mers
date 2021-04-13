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

    public fontSizeMain: number;
    public fontSizeSecond: number;

    public currentQuiz: Quiz;
    public currentQuestion: number;

    public currentUser: User;

    public currentUserAndQuiz: UserAndQuizModel;
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
        // this.fontSizeMain = 70;
        // this.fontSizeSecond = 60;
        console.log(this.fontSizeMain);
        console.log(this.fontSizeSecond);

        // === QUIZ
        this.quizService.quizSelected$.subscribe();
        this.currentQuiz = this.quizService.getQuizSelected();
        console.log(this.currentQuiz);

        // === QUESTION
        this.currentQuestion = (this.currentQuiz) ? +this.currentQuiz.questions[0].id : 0;

        // === USER
        this.userService.userSelected$.subscribe();
        this.currentUser = this.userService.getUserSelected();

        // === USER AND QUIZ
        this.userAndQuizService.userAndQuizs$.subscribe();
        this.userAndQuizService.oneUserQuizzes$.subscribe();
        this.currentUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();


        // === RESTE
        this.backgroundColorForSelectedElements = 'white';
        this.currentSelectedAnswer = null;
        this.numberOfGoodResponses = 0;

    }

    ngOnInit(): void {

    }



    goToNextQuestion(): void {

        this.userAnswers.push({id_question: this.currentQuestion, response_user: this.currentSelectedAnswer.id_answer });

        console.log(this.currentUser);
        console.log(this.currentUserAndQuiz);

        if (this.currentSelectedAnswer && this.currentQuestion < this.inNumberOfQuestionsInQuiz() - 1) {

            if (this.currentSelectedAnswer.is_correct) {
                this.numberOfGoodResponses += 1;
            }

            this.currentQuestion += 1;
        } else {
            console.log('fini');
            console.log(this.numberOfGoodResponses);
            //this.userAndQuizService.setAnswersForOneUserQuizzes(this.currentQuiz.id, this.numberOfGoodResponses, this.userAnswers);
            this.router.navigate(['/quiz-result']);
        }

        this.currentSelectedAnswer = null;

        console.log(this.userAnswers);
    }

    selectedAnswer(answer: Answer): void {

        this.currentSelectedAnswer = answer;
    }


    getColorForSelectedItems(answer: Answer): string {

        if (answer === this.currentSelectedAnswer){
            return '#73B7A0';
        }
        return 'white';
    }

    getColorForSelectedImages(answer: Answer): string {

        if (answer === this.currentSelectedAnswer){
            return '20px solid #73B7A0';
        }
        return 'none';
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



}
