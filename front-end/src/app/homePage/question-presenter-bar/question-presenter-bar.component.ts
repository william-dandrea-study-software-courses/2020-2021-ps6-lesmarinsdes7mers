import {Component, Input, OnInit} from '@angular/core';
import {Difficulty} from '../../../models/quiz.model';
import UserPrefsService from "../../../services/userprefs.service";

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

  public fontSizeMain: number;
  public fontSizeSecond: number;

  constructor(private userPrefsService: UserPrefsService) {
    this.fontSizeMain =  Math.max(50, this.userPrefsService.getFontSize());
    this.fontSizeSecond = Math.max(30, this.userPrefsService.getFontSize() - 10);
  }

  ngOnInit(): void {
  }


}
