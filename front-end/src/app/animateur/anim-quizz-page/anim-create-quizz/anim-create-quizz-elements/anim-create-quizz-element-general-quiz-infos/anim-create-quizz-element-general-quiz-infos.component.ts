import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Difficulty, Privacy} from "../../../../../../models/quiz.model";
import {Visibility} from "../../../../../../models/quiz-creation.model";

@Component({
  selector: 'app-anim-create-quizz-element-general-quiz-infos',
  templateUrl: './anim-create-quizz-element-general-quiz-infos.component.html',
  styleUrls: ['./anim-create-quizz-element-general-quiz-infos.component.scss']
})
export class AnimCreateQuizzElementGeneralQuizInfosComponent implements OnInit {

  @Input() quizName: string = "";
  @Output() quizNameChange: EventEmitter<string> = new EventEmitter();

  @Input() quizDifficulty: Difficulty = Difficulty.EASY;
  @Output() quizDifficultyChange: EventEmitter<Difficulty> = new EventEmitter();

  @Input() quizPrivacy: Privacy = {
    users_access: [],
    is_public: false
  }
  @Output() quizPrivacyChange: EventEmitter<Privacy> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  editQuizName(event: any): void {
    //this.quizNameRequest.emit(event.target.value);
    this.quizName = event.target.value
    this.quizNameChange.emit(this.quizName)
    console.log('QUIZ-INFO : EDIT NAME : ' + event.target.value);
  }

  editQuizDifficulty(event: number): void {
    switch (event) {
      case 0: this.quizDifficulty = Difficulty.EASY; break;
      case 1: this.quizDifficulty = Difficulty.MEDIUM; break;
      case 2: this.quizDifficulty = Difficulty.HARD; break;
      case 3: this.quizDifficulty = Difficulty.EXPERT; break;
    }
    this.quizDifficultyChange.emit(this.quizDifficulty)
  }

  editQuizVisibility(event: boolean): void {
    this.quizPrivacy = {
      is_public: event,
      users_access: []
    }
    this.quizPrivacyChange.emit(this.quizPrivacy)
  }

}
