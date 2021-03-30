import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FillQuizService} from "../../../../services/fill-quiz.service";
import {QuizService} from "../../../../services/quiz.service";
import {Answer, Question, QuestionType} from "../../../../models/question.model";
import {Difficulty, Quiz} from "../../../../models/quiz.model";
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
    })
    if(this.answer != undefined)
      return;

    this.answer = {
      data: "mdr", is_correct: true
    }
    this.quiz = {
      id: 2,
      name: "TEST",
      difficulty: Difficulty.EASY,
      questions: [
        {
          type: QuestionType.TEXT,
          id: "1",
          question_name: "Je me marre",
          answers: [
            {
              is_correct: true, data: "lol"
            },
            {
              is_correct: false, data: "mdr"
            },
            {
              is_correct: false, data: "ptdr"
            },
            {
              is_correct: false, data: "jpp"
            }
          ]
        }
      ]
    }
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
