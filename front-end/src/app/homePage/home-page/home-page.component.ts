import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import UserPrefsService from "../../../services/userprefs.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public fontSize: number;

  constructor(private router: Router, public userPrefService: UserPrefsService ) {
    this.userPrefService.$fontSize.subscribe((fontSizeService: number) => {
      this.fontSize = fontSizeService;
    });
  }

  ngOnInit(): void {
  }

}
