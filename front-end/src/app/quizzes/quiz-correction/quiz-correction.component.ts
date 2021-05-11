import { Component, OnInit } from '@angular/core';
import UserPrefsService from '../../../services/user/userprefs.service';
import {Router} from '@angular/router';
import {Answer, Quiz} from '../../../models/quiz.model';
import {UserAndQuizModel, UserAnswer} from '../../../models/user-and-quiz.model';
import {UserAndQuizService} from '../../../services/user-and-quiz.service';
import {QuizService} from '../../../services/quiz/quiz.service';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-quiz-correction',
  templateUrl: './quiz-correction.component.html',
  styleUrls: ['./quiz-correction.component.scss']
})

/**
 * Classe qui affiche les questions répondu juste et les questions répondues fausses
 * @verified : D'Andréa William - 8 may 2021
 */

export class QuizCorrectionComponent implements OnInit {

  public fontSizeMain: number;
  public fontSizeSecond: number;
  answers: Answer[];

  private publicSession: boolean;

  public oneUserAndQuiz: UserAndQuizModel;
  public quizSelected: Quiz;

  public currentCorrectionSelected: number;

  public userSelected: User;


  constructor(private userPref: UserPrefsService, private router: Router, private userAndQuizService: UserAndQuizService,
              private quizService: QuizService, private userService: UserService ) {}

  public ngOnInit(): void {

    this.userPref.fontSize$.subscribe((internSize) => {
      this.fontSizeMain = internSize;
      this.fontSizeSecond = internSize - 10;
    });

    this.userService.isPublicSessionAsObservable().subscribe(internIsPublic => {
      this.publicSession = internIsPublic;

      if (!internIsPublic) {
        this.userService.getCurrentUserAsObservable().subscribe((user) => {
          this.userSelected = user;
        });
      }
    });
    this.userSelected = this.userService.getUserSelected();

    this.userAndQuizService.getOneUserQuizzesAsObservable().subscribe((elem) => this.oneUserAndQuiz = elem);
    this.oneUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();

    this.quizService.getQuizSelectedAsObservable().subscribe((elem) => this.quizSelected = elem);
    this.quizSelected = this.quizService.getQuizSelected();

    this.quizService.getCurrentCorrectionSelectedAsObservable().subscribe((elem) => this.currentCorrectionSelected = elem);
    this.currentCorrectionSelected = this.quizService.getCurrentQuestionSelected();
  }



  public getAllTheUserAnswers(): UserAnswer[] {

    const idQuiz = this.quizSelected.id;
    const answersUsers = this.oneUserAndQuiz.played_quizzes.findIndex(eQuiz => eQuiz.id_quiz === idQuiz);

    return this.oneUserAndQuiz.played_quizzes[answersUsers].user_answers;
  }

  public verifyIfAnswerIsCorrect(userAnswer: UserAnswer): boolean {

    const indexQuestionInQuizSelected = this.quizSelected.questions.findIndex(elem => +elem.id === userAnswer.id_question);
    if (indexQuestionInQuizSelected === -1) {
      return false;
    }

    const indexOfGoodAnswer = this.quizSelected.questions[indexQuestionInQuizSelected].answer.findIndex((elem) => elem.is_correct === true);
    const idOfGoodAnswer = this.quizSelected.questions[indexQuestionInQuizSelected].answer[indexOfGoodAnswer].id_answer;

    return idOfGoodAnswer === userAnswer.response_user;

  }

  public navigateToQuestionAnswerPage(answer: UserAnswer): void {

    this.quizService.setCurrentQuestionSelected(answer.id_question);
    this.router.navigate(['/quiz-correction-answer']);
  }



  public navigateToResult(): void {
    this.router.navigate(['/quiz-result']);
  }

  public navigateToHomepage(): void {

    this.router.navigate(['/homepage']).then(() => {
      if (!this.publicSession) {
        this.userService.setCurrentUser(this.userSelected.id);
      }
    });
  }

  public adaptPageToBigFont(): boolean {
    return this.fontSizeMain >= 50;

  }

}
