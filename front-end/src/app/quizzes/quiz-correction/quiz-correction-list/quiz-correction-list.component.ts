import { Component, OnInit } from '@angular/core';
import {Answer} from "../../../../models/question.model";
import {FillQuizService} from "../../../../services/fill-quiz.service";

@Component({
  selector: 'app-quiz-result-list',
  templateUrl: './quiz-correction-list.component.html',
  styleUrls: ['./quiz-correction-list.component.scss']
})
export class QuizCorrectionListComponent implements OnInit {

  answers: Answer[];

  constructor(private result: FillQuizService) {}

  ngOnInit(): void {
    this.answers = this.result.getSelectedAnswers();

    /*this.answers = [
      {is_correct: true, data: "lol"}, {is_correct: false, data: "mdr"}
    ];*/
  }
}
