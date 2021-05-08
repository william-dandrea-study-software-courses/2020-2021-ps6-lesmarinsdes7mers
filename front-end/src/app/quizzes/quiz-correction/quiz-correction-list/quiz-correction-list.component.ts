import { Component, OnInit } from '@angular/core';
import {FillQuizService} from "../../../../services/fill-quiz.service";
import {Answer} from "../../../../models/quiz.model";

@Component({
  selector: 'app-quiz-result-list',
  templateUrl: './quiz-correction-list.component.html',
  styleUrls: ['./quiz-correction-list.component.scss']
})
export class QuizCorrectionListComponent implements OnInit {

  public answers: Answer[];

  constructor(private result: FillQuizService) {}

  public ngOnInit(): void {
    this.answers = this.result.getSelectedAnswers();
  }
}
