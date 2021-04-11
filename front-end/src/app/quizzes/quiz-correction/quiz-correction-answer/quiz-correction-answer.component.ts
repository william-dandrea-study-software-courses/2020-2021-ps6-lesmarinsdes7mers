import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FillQuizService} from "../../../../services/fill-quiz.service";
import {QuizService} from "../../../../services/quiz.service";
import {Difficulty, Quiz, Answer, Question, QuestionType} from "../../../../models/quiz.model";
import UserPrefsService from "../../../../services/userprefs.service";

@Component({
  selector: 'app-quiz-correction-answer',
  templateUrl: './quiz-correction-answer.component.html',
  styleUrls: ['./quiz-correction-answer.component.scss']
})
export class QuizCorrectionAnswerComponent implements OnInit {

  quiz: Quiz;
  question: Question;
  answer: Answer;
  sizeFont: number;
  preSizeFont: number;

  constructor(private route: ActivatedRoute, private result: FillQuizService, private quizService: QuizService,
              private userPref: UserPrefsService) {
  }

  ngOnInit(): void {
    this.sizeFont = this.userPref.getFontSize();
    this.preSizeFont = this.userPref.getFontSize();
    const idQuestion = +this.route.snapshot.paramMap.get('id-question');
    this.answer = this.result.getSelectedAnswers()[idQuestion];
    this.quizService.quizzes$.subscribe(value => {
      this.quiz = value.find(value1 => value1.id == this.result.getQuizId());
      this.question = this.quiz.questions[idQuestion];
    });




    this.question = this.quiz.questions[0];
    this.sizeFont = 40;
  }

  registerFontSize(): void {
    this.sizeFont = this.preSizeFont;
    this.userPref.setFontSize(this.sizeFont);
  }

  increaseSizeFont(): void {
    this.preSizeFont++;
  }

  decreaseSizeFont(): void {
    if (this.preSizeFont > 1)
      this.preSizeFont--;
  }

}
