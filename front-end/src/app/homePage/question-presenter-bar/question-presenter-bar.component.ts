import {Component, Input, OnInit} from '@angular/core';
import {Difficulty} from '../../../models/quiz.model';
import UserPrefsService from '../../../services/userprefs.service';

@Component({
  selector: 'app-question-presenter-bar',
  templateUrl: './question-presenter-bar.component.html',
  styleUrls: ['./question-presenter-bar.component.scss']
})
/**
 * Classe qui affiche un quiz sur la page d'acceuil
 * @verifiec : D'Andréa William - 8 may 2021
 */

export class QuestionPresenterBarComponent implements OnInit {

  @Input() numberOfQuestions: number;
  @Input() difficulty: Difficulty;
  @Input() titleQuiz: string;
  @Input() isMade: boolean;
  @Input() numberOfGoodQuestions: number;
  @Input() idQuiz: number;
  @Input() playedQuiz: boolean;

  public fontSizeSecond: number;

  constructor(private userPrefsService: UserPrefsService) {}

  public ngOnInit(): void {
    this.userPrefsService.getFontSizeAsObservable().subscribe(internFOntSize => {
      this.fontSizeSecond = internFOntSize - 10;
    });
  }
}
