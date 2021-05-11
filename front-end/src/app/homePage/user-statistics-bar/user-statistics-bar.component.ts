import { Component, OnInit } from '@angular/core';
import UserPrefsService from '../../../services/user/userprefs.service';
import {UserService} from '../../../services/user/user.service';
import {UserAndQuizService} from '../../../services/user-and-quiz.service';
import {UserAndQuizModel} from '../../../models/user-and-quiz.model';
import {User} from '../../../models/user.model';
import {QuizService} from '../../../services/quiz/quiz.service';

@Component({
  selector: 'app-user-statistics-bar',
  templateUrl: './user-statistics-bar.component.html',
  styleUrls: ['./user-statistics-bar.component.scss']
})

export class UserStatisticsBarComponent implements OnInit {

  public fontSizeMain: number;
  public fontSizeSecond: number;

  private currentUser: User;

  public oneUserQuizzes: UserAndQuizModel;


  public averageScore: number;
  public numberOfRealizedQuiz: number;
  public successRate: number;

  constructor(private userPrefService: UserPrefsService, private userService: UserService,
              private userAndQuizService: UserAndQuizService, private quizService: QuizService) {}

  public ngOnInit(): void {
    this.userPrefService.getFontSizeAsObservable().subscribe(internFontSize => {
      this.fontSizeMain = internFontSize;
      this.fontSizeSecond = internFontSize - 10;
    });

    this.userService.getCurrentUserAsObservable().subscribe(internUser => {
      this.currentUser = internUser;
    });

    this.userAndQuizService.getOneUserQuizzesAsObservable().subscribe((internUserAndQuiz) => {
      this.oneUserQuizzes = internUserAndQuiz;


      if (this.oneUserQuizzes ) {
        this.numberOfRealizedQuiz = this.oneUserQuizzes.played_quizzes.length;

        let numberOfGoodResponses = 0;
        let totalNumberOfQuestionsPlayed = 0;

        this.oneUserQuizzes.played_quizzes.forEach(internPlayedQuiz => {
          numberOfGoodResponses = numberOfGoodResponses + internPlayedQuiz.score_user;


          const actualQuiz = this.quizService.getOneQuiz(+internPlayedQuiz.id_quiz);

          if (actualQuiz) {
            totalNumberOfQuestionsPlayed = totalNumberOfQuestionsPlayed + actualQuiz.questions.length;

          }

        });



        const average = numberOfGoodResponses / totalNumberOfQuestionsPlayed;

        this.successRate = average * 100;

        this.averageScore = 20 * this.successRate / 100;
      }
    });
  }



  public getSuccessRate(): string {
    return String(this.successRate.toFixed(0) + ' %');
  }

  public getNumberOfRealizedQuizzes(): string {
    return String(this.numberOfRealizedQuiz);
  }

  public getAverageScore(): string {
    return String(this.averageScore.toFixed(0) + ' / 20');
  }

}
