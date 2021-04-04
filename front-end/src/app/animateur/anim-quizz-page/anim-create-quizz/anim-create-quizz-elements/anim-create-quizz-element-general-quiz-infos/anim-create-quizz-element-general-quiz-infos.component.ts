import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Difficulty} from "../../../../../../models/quiz.model";
import {Visibility} from "../../../../../../models/quiz-creation.model";

@Component({
  selector: 'app-anim-create-quizz-element-general-quiz-infos',
  templateUrl: './anim-create-quizz-element-general-quiz-infos.component.html',
  styleUrls: ['./anim-create-quizz-element-general-quiz-infos.component.scss']
})
export class AnimCreateQuizzElementGeneralQuizInfosComponent implements OnInit {

  @Output() quizNameRequest = new EventEmitter<string>();
  @Output() quizDifficultyRequest = new EventEmitter<Difficulty>();
  @Output() quizVisibilityRequest = new EventEmitter<Visibility>();

  constructor() {
    this.quizVisibilityRequest.emit(Visibility.PUBLIC);
    this.quizDifficultyRequest.emit(Difficulty.EASY);
  }

  ngOnInit(): void {
  }

  editQuizName(event: any): void {
    this.quizNameRequest.emit(event.target.value);
    console.log('QUIZ-INFO : EDIT NAME : ' + event.target.value);
  }

  editQuizDifficulty(event: number): void {
    switch (event) {
      case 0: this.quizDifficultyRequest.emit(Difficulty.EASY); console.log('QUIZ-INFO : EDIT DIFFICULTY : ' + Difficulty.EASY); break;
      case 1: this.quizDifficultyRequest.emit(Difficulty.MEDIUM); console.log('QUIZ-INFO : EDIT DIFFICULTY : ' + Difficulty.MEDIUM); break;
      case 2: this.quizDifficultyRequest.emit(Difficulty.HARD); console.log('QUIZ-INFO : EDIT DIFFICULTY : ' + Difficulty.HARD); break;
      case 3: this.quizDifficultyRequest.emit(Difficulty.EXPERT); console.log('QUIZ-INFO : EDIT DIFFICULTY : ' + Difficulty.EXPERT); break;
    }
  }

  editQuizVisibility(event: number): void {
    switch (event) {
      case 0: this.quizVisibilityRequest.emit(Visibility.PUBLIC); console.log('QUIZ-INFO : EDIT VISIBILITY : ' + Visibility.PUBLIC); break;
      case 1: this.quizVisibilityRequest.emit(Visibility.PRIVATE); console.log('QUIZ-INFO : EDIT VISIBILITY : ' + Visibility.PRIVATE); break;
    }
  }

}
