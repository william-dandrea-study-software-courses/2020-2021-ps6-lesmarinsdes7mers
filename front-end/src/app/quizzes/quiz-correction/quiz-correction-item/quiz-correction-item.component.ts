import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Answer} from "../../../../models/quiz.model";

@Component({
    selector: 'app-quiz-result-item',
    templateUrl: './quiz-correction-item.component.html',
    styleUrls: ['./quiz-correction-item.component.scss']
})
export class QuizCorrectionItemComponent implements OnInit {

    @Input()
    answer: Answer;
    @Input()
    questionNum: number;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    navigateToAnswer() {
        this.router.navigate(["/quiz-correction-answer", this.questionNum]);
    }
}
