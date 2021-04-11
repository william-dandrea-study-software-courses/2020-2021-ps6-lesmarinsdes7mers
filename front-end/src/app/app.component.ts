import { Component, OnInit } from '@angular/core';
import { Handicap, HandicapToString } from 'src/models/handicap.enum';
import UserPrefsService from 'src/services/userprefs.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'starter-quiz';

  pathStyles = [
    'none.scss',
    'protanopie.scss',
    'deuteranopie.scss'
  ]

  constructor(private userprefsService: UserPrefsService) {
  }

  ngOnInit(): void {
    this.userprefsService.handicap$.subscribe((h) => {
      this.loadStyle(HandicapToString(h).toLowerCase() + '.css');
    });
  }

  loadStyle(styleName: string) {
    const head = document.getElementsByTagName('head')[0];

    let themeLink = document.getElementById('client-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }

  }


}
