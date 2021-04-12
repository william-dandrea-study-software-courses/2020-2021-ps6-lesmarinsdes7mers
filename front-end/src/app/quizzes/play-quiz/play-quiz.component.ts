import { Component, OnInit } from "@angular/core";
import UserPrefsService from "../../../services/userprefs.service";
import {QuizService} from "../../../services/quiz.service";
import {Answer, Quiz} from "../../../models/quiz.model";
import {UserAndQuizService} from "../../../services/user-and-quiz.service";
import {UserAndQuizModel} from "../../../models/user-and-quiz.model";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";



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

    constructor(private userPrefsService: UserPrefsService, private quizService: QuizService, private userAndQuizService: UserAndQuizService, private userService: UserService) {

        // === FONT SIZE
        this.userPrefsService.fontSize$.subscribe();
        // this.fontSizeMain = userPrefsService.getFontSize();
        // this.fontSizeSecond = userPrefsService.getFontSize() - 10;
        this.fontSizeMain = 70;
        this.fontSizeSecond = 60;
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



    }

    ngOnInit(): void {

    }




    goToNextQuestion(): void {

        console.log(this.currentUser);
        console.log(this.currentUserAndQuiz);

        if (this.currentQuestion < this.inNumberOfQuestionsInQuiz() - 1) {
            this.currentQuestion += 1;
        } else {
            console.log('fini');
        }
    }

    selectedAnswer(answer: Answer): void {



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




}
