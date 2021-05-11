import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../../services/quiz/quiz.service';
import {Difficulty, Quiz, Answer} from '../../../../models/quiz.model';
import UserPrefsService from '../../../../services/user/userprefs.service';
import {UserAndQuizService} from '../../../../services/user-and-quiz.service';
import {UserAndQuizModel} from '../../../../models/user-and-quiz.model';

@Component({
  selector: 'app-quiz-correction-answer',
  templateUrl: './quiz-correction-answer.component.html',
  styleUrls: ['./quiz-correction-answer.component.scss']
})

/**
 * @verified: D'Andréa William - 8 may 2021
 */

export class QuizCorrectionAnswerComponent implements OnInit {

  public idCurrentQuestion: number;

  public fontSizeMain: number;
  public fontSizeSecond: number;

  private currentUserAndQuiz: UserAndQuizModel;
  private currentQuiz: Quiz;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService,
              private userPrefsService: UserPrefsService, private userAndQuizService: UserAndQuizService) {}

  public ngOnInit(): void {
    this.userPrefsService.fontSize$.subscribe((internSize) => {
      this.fontSizeMain = internSize;
      this.fontSizeSecond = internSize - 10;
    });

    this.userAndQuizService.getOneUserQuizzesAsObservable().subscribe((elem) => this.currentUserAndQuiz = elem);
    this.currentUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();

    this.quizService.getQuizSelectedAsObservable().subscribe((elem) => this.currentQuiz = elem);
    this.currentQuiz = this.quizService.getQuizSelected();

    this.quizService.getCurrentCorrectionSelectedAsObservable().subscribe((elem) => this.idCurrentQuestion = elem);
    this.idCurrentQuestion = this.quizService.getCurrentQuestionSelected();
  }


  /**
   * Méthode qui permet de connaitre l'id de la bonne réponse à la question
   */
  public getGoodAnswerId(): number {
    const indexAns = this.currentQuiz.questions[this.idCurrentQuestion].answer.findIndex((elem) => elem.is_correct === true);
    return this.currentQuiz.questions[this.idCurrentQuestion].answer[indexAns].id_answer;
  }

  /**
   * Méthode qui permet de connaitre l'id de la bonne réponse de l'utilisateur
   */
  public getUserAnswerId(): number {
    const indexGoodPlayerQuiz = this.currentUserAndQuiz.played_quizzes.findIndex((elem) => elem.id_quiz === this.currentQuiz.id);
    const indexAnswer = this.currentUserAndQuiz.played_quizzes[indexGoodPlayerQuiz]
        .user_answers.findIndex(elem => elem.id_question === this.idCurrentQuestion );
    return this.currentUserAndQuiz.played_quizzes[indexGoodPlayerQuiz].user_answers[indexAnswer].response_user;

  }

  /**
   * Méthodes qui génére des infos sur le quiz
   */
  public inQuestionTitle(): string {
    return this.currentQuiz.questions[this.idCurrentQuestion].question_name;
  }

  public inQuestionAnswers(): Answer[] {
    return this.currentQuiz.questions[this.idCurrentQuestion].answer;
  }

  public isTextAnswer(): boolean {
    const indexOfQuestion = this.currentQuiz.questions.findIndex(elem => +elem.id === this.idCurrentQuestion);
    return this.currentQuiz.questions[indexOfQuestion].type === 0;
  }

  public inNumberOfQuestionsInQuiz(): number {
    return this.currentQuiz.questions.length;
  }

  public adaptPageToBigFont(): boolean {
    return this.fontSizeMain >= 50;
  }


  /**
   * Navigation en arrière vers la page de correction
   */
  navigateToQuizCorrection(): void {
    this.router.navigate(['/quiz-correction']);
  }

}
