import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import UserPrefsService from "../../services/userprefs.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-change-font-size',
  templateUrl: './change-font-size.component.html',
  styleUrls: ['./change-font-size.component.scss']
})

/**
 * @verified : D'Andréa William - 7 may 2021
 */

export class ChangeFontSizeComponent implements OnInit, OnDestroy {

  @Input() showTheSizeWritings: boolean;

  private fontSizeSubscription: Subscription;
  public fontSizeMain: number;
  public fontSizeSecond: number;

  constructor(private userPref: UserPrefsService) {}

  public ngOnInit(): void {
    this.fontSizeSubscription = this.userPref.getFontSizeAsObservable().subscribe(internFontSize => {
      this.fontSizeMain = internFontSize;
      this.fontSizeSecond = internFontSize - 10;
    });
  }

  /**
   * Appel directement de la méthode du service userPref afin de garantir une meilleure modification des tailles
   * min et max et du pas sur tout le site
   */
  public increaseSizeFont(): void {
    this.userPref.increaseFontSize();
  }

  /**
   * Appel directement de la méthode du service userPref afin de garantir une meilleure modification des tailles
   * min et max et du pas sur tout le site
   */
  public decreaseSizeFont(): void {
    this.userPref.decreaseFontSize();
  }

  public ngOnDestroy(): void {
    this.fontSizeSubscription.unsubscribe();
  }
}
