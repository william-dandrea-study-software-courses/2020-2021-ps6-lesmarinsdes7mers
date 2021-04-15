import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FillQuizService} from "../../../../services/fill-quiz.service";
import {QuizService} from "../../../../services/quiz.service";
import {Difficulty, Quiz, Answer, Question, QuestionType} from "../../../../models/quiz.model";
import UserPrefsService from "../../../../services/userprefs.service";
import {UserAndQuizService} from "../../../../services/user-and-quiz.service";
import {UserAndQuizModel} from "../../../../models/user-and-quiz.model";

@Component({
  selector: 'app-quiz-correction-answer',
  templateUrl: './quiz-correction-answer.component.html',
  styleUrls: ['./quiz-correction-answer.component.scss']
})
export class QuizCorrectionAnswerComponent implements OnInit {

  public idCurrentQuestion: number;

  public fontSizeMain: number;
  public fontSizeSecond: number;

  public currentUserAndQuiz: UserAndQuizModel;
  public currentQuiz: Quiz;


  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, private userPrefsService: UserPrefsService, private userAndQuizService: UserAndQuizService) {



    this.userPrefsService.fontSize$.subscribe((elem) => {this.fontSizeMain = elem; this.fontSizeSecond = elem - 10; });
    this.fontSizeMain = this.userPrefsService.getFontSize();
    this.fontSizeSecond = this.userPrefsService.getFontSize() - 10;

    this.userAndQuizService.oneUserQuizzes$.subscribe((elem) => this.currentUserAndQuiz = elem);
    this.currentUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();

    this.quizService.quizSelected$.subscribe((elem) => this.currentQuiz = elem);
    this.currentQuiz = this.quizService.getQuizSelected();

    this.quizService.currentCorrectionSelected$.subscribe((elem) => this.idCurrentQuestion = elem);
    this.idCurrentQuestion = quizService.getCurrentQuestionSelected();

  }

  ngOnInit(): void {

    console.log(this.idCurrentQuestion);

  }


  getGoodAnswerId(): number {

    const indexAns = this.currentQuiz.questions[this.idCurrentQuestion].answer.findIndex((elem) => elem.is_correct === true);
    return this.currentQuiz.questions[this.idCurrentQuestion].answer[indexAns].id_answer;
  }

  getUserAnswerId(): number {
    const indexGoodPlayerQuiz = this.currentUserAndQuiz.played_quizzes.findIndex((elem) => elem.id_quiz === this.currentQuiz.id);
    const tst2 = this.currentUserAndQuiz.played_quizzes[indexGoodPlayerQuiz].user_answers.findIndex(elem => elem.id_question === this.idCurrentQuestion );
    return this.currentUserAndQuiz.played_quizzes[indexGoodPlayerQuiz].user_answers[tst2].response_user;

  }

  inQuestionTitle(): string {

    console.log('============');
    console.log(this.currentQuiz.questions);
    console.log(this.idCurrentQuestion);
    console.log('============');


    return this.currentQuiz.questions[this.idCurrentQuestion].question_name;
  }

  inQuestionAnswers(): Answer[] {
    return this.currentQuiz.questions[this.idCurrentQuestion].answer;
  }

  isTextAnswer(): boolean {

    const indexOfQuestion = this.currentQuiz.questions.findIndex(elem => +elem.id === this.idCurrentQuestion);
    console.log(indexOfQuestion);
    console.log( this.currentQuiz.questions[indexOfQuestion]);
    return this.currentQuiz.questions[indexOfQuestion].type === 0;
  }

  inNumberOfQuestionsInQuiz(): number {
    return this.currentQuiz.questions.length;
  }


  adaptPageToBigFont(): boolean {
    if (this.fontSizeMain >= 50) {
      return true;
    }
    return false;
  }


  navigateToQuizCorrection(): void {
    this.router.navigate(["/quiz-correction"]);
  }

}
