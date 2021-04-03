import { Component, OnInit } from '@angular/core';
import {Answer, Question, QuestionType} from "../../../../../../../models/question.model";

@Component({
  selector: 'app-anim-create-quizz-element-add-question-bloc',
  templateUrl: './anim-create-quizz-element-add-question-bloc.component.html',
  styleUrls: ['./anim-create-quizz-element-add-question-bloc.component.scss']
})
export class AnimCreateQuizzElementAddQuestionBlocComponent implements OnInit {

  quest: Question;

  questId: string;
  questName: string;
  questType: QuestionType;
  questAnswers: Answer[] = new Array();



  constructor() { }

  ngOnInit(): void {
  }

  addAnswer(isCorrect: boolean, dataM: string): void {
    this.questAnswers.push({is_correct: isCorrect, data: dataM});
  }


}
