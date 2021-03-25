import { Component, OnInit } from "@angular/core";

import { Question } from "src/models/question.model";
import UserPrefsService from "src/services/userprefs.service";

@Component({
    selector: 'app-play-quiz',
    templateUrl: './play-quiz.component.html',
    styleUrls: ['./play-quiz.component.scss'],
})
export class PlayQuizComponent implements OnInit {

    private static OFFSET: number = 5;
    private static MAX_FONTSIZE: number = 40;
    private static MIN_FONTSIZE: number = 10;

    question: Question;

    fontsize: number;
    answerDisplayStyle: string = "block";

    constructor(private userPrefsService: UserPrefsService) {
        this.fontsize = Math.min(Math.max(userPrefsService.getFontSize(), PlayQuizComponent.MIN_FONTSIZE), PlayQuizComponent.MAX_FONTSIZE);

        if (this.fontsize > 30)
            this.answerDisplayStyle = "inline-block";
    }

    ngOnInit() {}

    increaseFontsize(): void {
        if (this.fontsize >= PlayQuizComponent.MAX_FONTSIZE)
            return;

        this.fontsize += PlayQuizComponent.OFFSET;
        this.userPrefsService.setFontSize(this.fontsize);

        if (this.fontsize > 30)
            this.answerDisplayStyle = "inline-block";
    }

    decreaseFontsize(): void {
        if (this.fontsize <= PlayQuizComponent.MIN_FONTSIZE)
            return;

        this.fontsize -= PlayQuizComponent.OFFSET;
        this.userPrefsService.setFontSize(this.fontsize);

        if (this.fontsize <= 30)
            this.answerDisplayStyle = "block";
    }
}