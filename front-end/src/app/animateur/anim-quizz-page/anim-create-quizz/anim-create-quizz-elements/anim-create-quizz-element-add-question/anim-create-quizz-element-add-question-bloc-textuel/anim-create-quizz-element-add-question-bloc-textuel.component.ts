import {Component, Input, OnInit, EventEmitter, Output, SimpleChange, SimpleChanges, OnChanges} from '@angular/core';
import {Answer} from "../../../../../../../models/question.model";

@Component({
  selector: 'app-anim-create-quizz-element-add-question-bloc-textuel',
  templateUrl: './anim-create-quizz-element-add-question-bloc-textuel.component.html',
  styleUrls: ['./anim-create-quizz-element-add-question-bloc-textuel.component.scss']
})
export class AnimCreateQuizzElementAddQuestionBlocTextuelComponent implements OnInit {
  constructor() { }


  public listOfAnswers: Answer[] = new Array();

  @Input() numberOfAnswersListener: number;
  @Output() answersEmitter = new EventEmitter<Answer[]>();


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.numberOfAnswersListener) {
      this.listOfAnswers.push({is_correct: false, data: ''});
    }
  }









}
