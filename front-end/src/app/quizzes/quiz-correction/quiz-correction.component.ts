import { Component, OnInit } from '@angular/core';
import UserPrefsService from "../../../services/userprefs.service";

@Component({
  selector: 'app-quiz-correction',
  templateUrl: './quiz-correction.component.html',
  styleUrls: ['./quiz-correction.component.scss']
})
export class QuizCorrectionComponent implements OnInit {

  sizeFont: number;
  preSizeFont: number;

  constructor(private userPref: UserPrefsService) { }

  ngOnInit(): void {
    this.sizeFont = this.userPref.getFontSize();
    this.preSizeFont = this.userPref.getFontSize();
  }

  registerFontSize(): void {
    this.sizeFont = this.preSizeFont;
    this.userPref.setFontSize(this.sizeFont);
  }

  increaseSizeFont(): void {
    this.preSizeFont++;
  }

  decreaseSizeFont(): void {
    if (this.preSizeFont > 1)
      this.preSizeFont--;
  }

}
