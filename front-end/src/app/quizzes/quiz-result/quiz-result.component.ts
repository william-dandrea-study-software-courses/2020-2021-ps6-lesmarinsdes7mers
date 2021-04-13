import { Component, OnInit } from '@angular/core';
import UserPrefsService from "../../../services/userprefs.service";
import {FillQuizService} from "../../../services/fill-quiz.service";

import {Router} from "@angular/router";
import {Answer, Quiz} from "../../../models/quiz.model";
import {UserAndQuizService} from "../../../services/user-and-quiz.service";
import {UserAndQuizModel, UserAnswer} from "../../../models/user-and-quiz.model";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  fontSizeMain: number;
  fontSizeSecond: number;


  public oneUserAndQuiz: UserAndQuizModel;
  public quizSelected: Quiz;

  constructor(private userPref: UserPrefsService, private router: Router, private userAndQuizService: UserAndQuizService, private quizService: QuizService ) {
    this.userAndQuizService.oneUserQuizzes$.subscribe((elem) => this.oneUserAndQuiz = elem);
    this.quizService.quizSelected$.subscribe((elem) => this.quizSelected = elem);

    this.userPref.fontSize$.subscribe((size) => {
      this.fontSizeMain = size;
      this.fontSizeSecond = size - 10;
    });


  }

  ngOnInit(): void {
    this.fontSizeMain = this.userPref.getFontSize();
    this.fontSizeSecond = this.userPref.getFontSize() - 10;
    this.oneUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();
    this.quizSelected = this.quizService.getQuizSelected();
    console.log(this.oneUserAndQuiz);
  }



  getNumberOfGoodQuestions(): number {

    const idQuiz = this.quizSelected.id;
    const answersUsers = this.oneUserAndQuiz.played_quizzes.findIndex(eQuiz => eQuiz.id_quiz === idQuiz);

    return this.oneUserAndQuiz.played_quizzes[answersUsers].score_user;
  }

  getNumberOfBadQuestions(): number {
    const idQuiz = this.quizSelected.id;
    const answersUsers = this.oneUserAndQuiz.played_quizzes.findIndex(eQuiz => eQuiz.id_quiz === idQuiz);

    return this.quizSelected.questions.length -  this.oneUserAndQuiz.played_quizzes[answersUsers].score_user;
  }

  getNumberOfQuestions(): number {
    return this.quizSelected.questions.length;
  }

  getResultPercentage(): number {
    return this.getNumberOfGoodQuestions() * 100 / this.getNumberOfBadQuestions();
  }




  navigateToCorrection(): void {
    console.log(this.oneUserAndQuiz);
    this.router.navigate(["/quiz-correction"]);
  }

  navigateToHomepage(): void {
    this.router.navigate(["/homepage"]);
  }

  adaptPageToBigFont(): boolean {
    if (this.fontSizeMain >= 50) {
      return true;
    }
    return false;
  }

}
