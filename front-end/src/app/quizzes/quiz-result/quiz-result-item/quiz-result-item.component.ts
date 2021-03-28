import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-quiz-result-item',
  templateUrl: './quiz-result-item.component.html',
  styleUrls: ['./quiz-result-item.component.scss']
})
export class QuizResultItemComponent implements OnInit {

  @Input()
  num: number;
  @Input()
  correct: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
