import { Component, OnInit } from '@angular/core';
import UserPrefsService from "../../../services/user/userprefs.service";

import {Router} from "@angular/router";
import {Quiz} from "../../../models/quiz.model";
import {UserAndQuizService} from "../../../services/user-and-quiz.service";
import {UserAndQuizModel, UserAnswer} from "../../../models/user-and-quiz.model";
import {QuizService} from "../../../services/quiz/quiz.service";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  fontSizeMain: number;
  fontSizeSecond: number;

  private publicSession: boolean;

  public oneUserAndQuiz: UserAndQuizModel;
  public quizSelected: Quiz;
  public userSelected: User;

  constructor(private userPref: UserPrefsService, private router: Router, private userAndQuizService: UserAndQuizService, private quizService: QuizService, private userService: UserService ) {}

  ngOnInit(): void {

    this.publicSession = this.userService.isPublicSession();

    this.userPref.getFontSizeAsObservable().subscribe(internFontSize => {
      this.fontSizeMain = internFontSize;
      this.fontSizeSecond = internFontSize - 10;
    });

    if (!this.publicSession) {
      // Session privée
      this.userSelected = this.userService.getUserSelected();
    } else {
      // Session publique
    }

    this.oneUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();

    this.quizSelected = this.quizService.getQuizSelected();
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
    this.router.navigate(['/homepage']).then(() => {
      if (!this.publicSession) {
        this.userService.setCurrentUser(this.userSelected.id);
      }
    });
  }

  adaptPageToBigFont(): boolean {
    if (this.fontSizeMain >= 50) {
      return true;
    }
    return false;
  }

}
