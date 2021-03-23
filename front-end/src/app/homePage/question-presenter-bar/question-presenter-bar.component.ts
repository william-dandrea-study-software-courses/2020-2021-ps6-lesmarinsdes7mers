import {Component, Input, OnInit} from '@angular/core';
import {Difficulty} from '../../../models/quiz.model';

@Component({
  selector: 'app-question-presenter-bar',
  templateUrl: './question-presenter-bar.component.html',
  styleUrls: ['./question-presenter-bar.component.scss']
})
export class QuestionPresenterBarComponent implements OnInit {

  @Input() numberOfQuestions: number;
  @Input() difficulty: Difficulty;
  @Input() titleQuiz: string;
  @Input() isMade: boolean;
  @Input() numberOfGoodQuestions: number;
  @Input() idQuiz: number;

  constructor() { }

  ngOnInit(): void {
  }


}
