import { Component, OnInit } from '@angular/core';
import UserPrefsService from "../../../services/userprefs.service";
import {FillQuizService} from "../../../services/fill-quiz.service";

import {Router} from "@angular/router";
import {Answer} from "../../../models/quiz.model";

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  sizeFont: number;
  preSizeFont: number;
  answers: Answer[];

  constructor(private userPref: UserPrefsService, private result: FillQuizService, private router: Router) { }

  ngOnInit(): void {
    this.sizeFont = this.userPref.getFontSize();
    this.preSizeFont = this.userPref.getFontSize();
    this.answers = this.result.getSelectedAnswers();
    console.log(this.answers);
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

  getRightAnswerCount(): number {
    return this.answers.filter(answer => answer.is_correct).length;
  }

  getFalseAnswerCount(): number {
    return this.answers.filter(answer => !answer.is_correct).length;
  }

  getResultInPercent(): number {
    return Math.round(this.getRightAnswerCount() / this.answers.length * 100);
  }

  navigateToCorrection() {
    this.router.navigate(["/quiz-correction"]);
  }

  navigateToHomepage() {
    this.router.navigate(["/homepage"]);
  }

}
