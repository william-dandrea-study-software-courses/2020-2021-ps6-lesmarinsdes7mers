import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-anim-create-quizz-element-header',
  templateUrl: './anim-create-quizz-element-header.component.html',
  styleUrls: ['./anim-create-quizz-element-header.component.scss']
})
export class AnimCreateQuizzElementHeaderComponent implements OnInit {

  @Output() deleteQuizRequest = new EventEmitter<boolean>();
  @Output() saveAndExitQuiz = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteQuiz(): void {
    console.log('HeaderComponent : onDeleteQuiz()');
    this.deleteQuizRequest.emit(true);
  }

  onSaveAndExitQuiz(): void {
    console.log('HeaderComponent : onSaveAndExitQuiz()');
    this.saveAndExitQuiz.emit(true);
  }

}
