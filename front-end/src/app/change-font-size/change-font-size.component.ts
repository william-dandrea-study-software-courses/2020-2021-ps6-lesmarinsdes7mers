import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import UserPrefsService from "../../services/userprefs.service";

@Component({
  selector: 'app-change-font-size',
  templateUrl: './change-font-size.component.html',
  styleUrls: ['./change-font-size.component.scss']
})
export class ChangeFontSizeComponent implements OnInit {

  @Input() dispTheSizeWritings: boolean;

  public fontSizeMain: number;
  public fontSizeSecond: number;




  constructor(private userPref: UserPrefsService) {
    this.fontSizeMain =  Math.max(50, this.userPref.getFontSize());
    this.fontSizeSecond = Math.max(30, this.userPref.getFontSize() - 10);
  }

  ngOnInit(): void {
    this.fontSizeMain = this.userPref.getFontSize();

  }




  increaseSizeFont(): void {
    if (this.fontSizeMain < 70) {
      this.userPref.setFontSize(this.fontSizeMain += 5);
    }

    // this.startTimer(false);
  }

  decreaseSizeFont(): void {
    if (this.fontSizeMain > 20) {
      this.userPref.setFontSize(this.fontSizeMain -= 5);
      // this.startTimer(true);
    }
  }

  /*
  startTimer(neg: boolean): void {
    this.interval = setInterval(() => {
      if (neg)
        this.fontSizeMain -= 5;
      else
        this.fontSizeMain += 5;
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.interval);
  }

   */



}
