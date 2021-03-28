import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Question } from "src/models/question.model";
import { Quiz } from "src/models/quiz.model";
import { FillQuizService } from "src/services/fill-quiz.service";
import { QuizService } from "src/services/quiz.service";
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
    quiz: Quiz;

    nbQuestion: number = 1;
    answerChoosen: number = 0;

    fontsize: number;
    answerDisplayStyle: string = "block";

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private quizService: QuizService,
        private fillQuizService: FillQuizService,
        private userPrefsService: UserPrefsService) {
        this.fontsize = Math.min(Math.max(userPrefsService.getFontSize(), PlayQuizComponent.MIN_FONTSIZE), PlayQuizComponent.MAX_FONTSIZE);

        if (this.fontsize > 30)
            this.answerDisplayStyle = "inline-block";
    }

    ngOnInit() {
        this.fillQuizService.clearSelection();
        this.loadData();
    }

    loadData(): void {
        const quizId = +this.route.snapshot.paramMap.get('id-quiz');
        const questionId = 0;

        this.quizService.quizzes$.subscribe(quiz => {
            this.quiz = quiz.find(q => quizId === q.id);
            this.question = this.quiz.questions[questionId];
        });

        this.nbQuestion = questionId + 1;
        this.fillQuizService.setQuizId(quizId);
    }

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

    chooseQuestion(id: number): void {
        if (id < 1 || id > 4) {
            this.answerChoosen = 0;
        }
        else {
            this.answerChoosen = id;
        }
    }

    validate(): void {
        //console.log("selected answer: ", this.question.answers[this.answerChoosen - 1]);
        this.fillQuizService.addAnswerChoice(this.question.answers[this.answerChoosen - 1]);

        if (this.nbQuestion >= this.quiz.questions.length) {
            // go to next
            this.router.navigate(['/quiz-correction']);
        }
        else {
            if (this.answerChoosen < 1 || this.answerChoosen > this.question.answers.length)
                return;

            this.question = this.quiz.questions[this.nbQuestion];
            this.nbQuestion++;

            this.answerChoosen = 0;
        }
    }
}