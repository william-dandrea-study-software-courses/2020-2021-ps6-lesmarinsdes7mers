import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Difficulty} from "../../../models/quiz.model";

@Component({
  selector: 'app-difficulty-bar',
  templateUrl: './difficulty-bar.component.html',
  styleUrls: ['./difficulty-bar.component.scss']
})
export class DifficultyBarComponent implements OnInit {

  @Output() difficultyChoiceEvent = new EventEmitter<Difficulty>();

  numberOfClickOnEasy: number;
  numberOfClickOnMedium: number;
  numberOfClickOnHard: number;
  numberOfClickOnExpert: number;

  private reinitializeQuizz: boolean;

  constructor() {
    this.numberOfClickOnEasy = 0;
    this.numberOfClickOnMedium = 0;
    this.numberOfClickOnHard = 0;
    this.numberOfClickOnExpert = 0;
  }

  ngOnInit(): void {
  }


  choiseTheDifficulty(event, arg: number): void {

    switch (arg as number) {
      case 0:  {
        this.numberOfClickOnEasy++;
        if (this.numberOfClickOnEasy === 1) {
          this.difficultyChoiceEvent.emit(Difficulty.EASY);
          this.reinitializeQuizz = false;
          this.numberOfClickOnMedium = 0; this.numberOfClickOnHard = 0; this.numberOfClickOnExpert = 0;
        } else {
          this.numberOfClickOnEasy = 0; this.numberOfClickOnMedium = 0; this.numberOfClickOnHard = 0; this.numberOfClickOnExpert = 0;
          this.reinitializeQuizz = true;
        }
        break;
      }
      case 1: {
        this.numberOfClickOnMedium++;
        if (this.numberOfClickOnMedium === 1) {
          this.difficultyChoiceEvent.emit(Difficulty.MEDIUM);
          this.reinitializeQuizz = false;
          this.numberOfClickOnEasy = 0;  this.numberOfClickOnHard = 0; this.numberOfClickOnExpert = 0;
        } else {
          this.numberOfClickOnEasy = 0; this.numberOfClickOnMedium = 0; this.numberOfClickOnHard = 0; this.numberOfClickOnExpert = 0;
          this.reinitializeQuizz = true;
        }
        break;
    }
      case 2: {
        this.numberOfClickOnHard++;
        if (this.numberOfClickOnHard === 1) {
          this.difficultyChoiceEvent.emit(Difficulty.HARD);
          this.reinitializeQuizz = false;
          this.numberOfClickOnEasy = 0; this.numberOfClickOnMedium = 0; this.numberOfClickOnExpert = 0;
        } else {
          this.numberOfClickOnEasy = 0; this.numberOfClickOnMedium = 0; this.numberOfClickOnHard = 0; this.numberOfClickOnExpert = 0;
          this.reinitializeQuizz = true;
        }
        break;
      }
      case 3: {
        this.numberOfClickOnExpert++;
        if (this.numberOfClickOnExpert === 1) {
          this.difficultyChoiceEvent.emit(Difficulty.EXPERT);
          this.reinitializeQuizz = false;
          this.numberOfClickOnEasy = 0; this.numberOfClickOnMedium = 0; this.numberOfClickOnHard = 0;
        } else {
          this.numberOfClickOnEasy = 0; this.numberOfClickOnMedium = 0; this.numberOfClickOnHard = 0; this.numberOfClickOnExpert = 0;
          this.reinitializeQuizz = true;
        }
        break;
      }
    }

    if (this.reinitializeQuizz === true) {
      this.difficultyChoiceEvent.emit(null);
    }
  }

}
