import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Difficulty} from "../../../models/quiz.model";
import UserPrefsService from "../../../services/userprefs.service";

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

  public fontSize: number;

  constructor(private userPrefsService: UserPrefsService) {

    /*
    this.userPrefsService.fontSize$.subscribe((eachFontSize) => {
      this.fontSize = eachFontSize;
      console.log(this.fontSize);
    });

     */

  }

  ngOnInit(): void {
    this.numberOfClickOnEasy = 0;
    this.numberOfClickOnMedium = 0;
    this.numberOfClickOnHard = 0;
    this.numberOfClickOnExpert = 0;

    this.fontSize = Math.max(50, this.userPrefsService.getFontSize());
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
