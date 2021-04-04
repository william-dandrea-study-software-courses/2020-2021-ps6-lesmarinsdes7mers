import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-anim-create-quizz-element-add-question-bloc-image',
  templateUrl: './anim-create-quizz-element-add-question-bloc-image.component.html',
  styleUrls: ['./anim-create-quizz-element-add-question-bloc-image.component.scss']
})
export class AnimCreateQuizzElementAddQuestionBlocImageComponent implements OnInit {

  @Input() numberOfAnswersListener: number;


  constructor() { }

  ngOnInit(): void {
  }

}
