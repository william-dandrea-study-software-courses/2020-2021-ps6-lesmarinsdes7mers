import { Component, OnInit } from '@angular/core';
import UserPrefsService from "../../services/userprefs.service";

@Component({
  selector: 'app-change-font-size',
  templateUrl: './change-font-size.component.html',
  styleUrls: ['./change-font-size.component.scss']
})
export class ChangeFontSizeComponent implements OnInit {

  sizeFont: number;
  preSizeFont: number;
  interval;

  constructor(private userPref: UserPrefsService) {
    userPref.$fontSize.subscribe(value => this.sizeFont = value);
  }

  ngOnInit(): void {
    this.sizeFont = this.userPref.getFontSize();
    this.preSizeFont = this.sizeFont;
  }

  registerFontSize(): void {
    this.userPref.setFontSize(this.preSizeFont);
  }

  increaseSizeFont(): void {
    this.preSizeFont++;
    this.startTimer(false);
  }

  decreaseSizeFont(): void {
    if (this.preSizeFont > 1) {
      this.preSizeFont--;
      this.startTimer(true);
    }
  }

  startTimer(neg: boolean): void {
    this.interval = setInterval(() => {
      if (neg)
        this.preSizeFont -= 5;
      else
        this.preSizeFont += 5;
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.interval);
  }



}
