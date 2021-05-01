import {Component, Input, OnInit} from '@angular/core';
import {ConfigSizeFont} from "../../../models/user.model";
import UserPrefsService from "../../../services/userprefs.service";

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {

  @Input()
  public userConfig: ConfigSizeFont;
  public fontSize: number;
  public selected: boolean;

  constructor(private userPrefsService: UserPrefsService) { }

  ngOnInit(): void {
    this.userPrefsService.fontSize$.subscribe(value => {
      this.fontSize = value;
      this.selected = this.userConfig.size == value;
    });
    this.fontSize = this.userPrefsService.getFontSize();
    this.selected = this.fontSize == this.userConfig.size;
    console.log(this.selected+" - "+this.fontSize)
  }

}
