import { Component, OnInit } from '@angular/core';
import UserPrefsService from "../../../services/userprefs.service";
import {Router} from "@angular/router";
import {Answer, Quiz} from "../../../models/quiz.model";
import {UserAndQuizModel, UserAnswer} from "../../../models/user-and-quiz.model";
import {UserAndQuizService} from "../../../services/user-and-quiz.service";
import {QuizService} from "../../../services/quiz.service";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-quiz-correction',
  templateUrl: './quiz-correction.component.html',
  styleUrls: ['./quiz-correction.component.scss']
})
export class QuizCorrectionComponent implements OnInit {

  fontSizeMain: number;
  fontSizeSecond: number;
  answers: Answer[];

  public oneUserAndQuiz: UserAndQuizModel;
  public quizSelected: Quiz;

  public currentCorrectionSelected: number;

  public userSelected: User;


  constructor(private userPref: UserPrefsService, private router: Router, private userAndQuizService: UserAndQuizService, private quizService: QuizService, private userService: UserService ) {
    this.userAndQuizService.oneUserQuizzes$.subscribe((elem) => this.oneUserAndQuiz = elem);
    this.oneUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();
    this.quizService.quizSelected$.subscribe((elem) => this.quizSelected = elem);
    this.quizSelected = this.quizService.getQuizSelected();

    this.userPref.fontSize$.subscribe((size) => {
      this.fontSizeMain = size;
      this.fontSizeSecond = size - 20;
    });
    this.fontSizeMain = this.userPref.getFontSize();
    this.fontSizeSecond = this.userPref.getFontSize() - 20;


    this.quizService.currentCorrectionSelected$.subscribe((elem) => this.currentCorrectionSelected = elem);
    this.currentCorrectionSelected = this.quizService.getCurrentQuestionSelected();

    this.userService.userSelected$.subscribe(elem => this.userSelected = elem);
    this.userSelected = this.userService.getUserSelected();
  }

  ngOnInit(): void {
  }



  getAllTheUserAnswers(): UserAnswer[] {

    console.log('getAllTheUsers ===========');
    console.log(this.quizSelected.id);
    const idQuiz = this.quizSelected.id;
    const answersUsers = this.oneUserAndQuiz.played_quizzes.findIndex(eQuiz => eQuiz.id_quiz === idQuiz);
    console.log(answersUsers);
    console.log(this.oneUserAndQuiz.played_quizzes[answersUsers]);

    console.log('getAllTheUsers ===========');
    return this.oneUserAndQuiz.played_quizzes[answersUsers].user_answers;
  }

  verifyIfAnswerIsCorrect(userAnswer: UserAnswer): boolean {


    const indexQuestionInQuizSelected = this.quizSelected.questions.findIndex(elem => +elem.id === userAnswer.id_question);
    if (indexQuestionInQuizSelected === -1) {
      return false;
    }

    const indexOfGoodAnswer = this.quizSelected.questions[indexQuestionInQuizSelected].answer.findIndex((elem) => elem.is_correct === true);
    const idOfGoodAnswer = this.quizSelected.questions[indexQuestionInQuizSelected].answer[indexOfGoodAnswer].id_answer;

    return idOfGoodAnswer === userAnswer.response_user;

  }

  navigateToQuestionAnswerPage(answer: UserAnswer): void {

    this.quizService.setCurrentQuestionSelected(answer.id_question);
    this.router.navigate(['/quiz-correction-answer']);
  }



  navigateToResult(): void {
    this.router.navigate(['/quiz-result']);
  }

  navigateToHomepage(): void {
    if (this.userSelected) {
      this.router.navigate(["/homepage/" + this.userSelected.id]);
    } else {
      this.router.navigate(["/homepage"]);
    }
  }



  adaptPageToBigFont(): boolean {
    if (this.fontSizeMain >= 50) {
      return true;
    }
    return false;
  }

}
