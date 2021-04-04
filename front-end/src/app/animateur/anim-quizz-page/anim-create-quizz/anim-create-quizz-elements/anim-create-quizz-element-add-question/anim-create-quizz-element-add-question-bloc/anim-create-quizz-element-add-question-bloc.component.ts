import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Answer, Question, QuestionType} from "../../../../../../../models/question.model";

@Component({
  selector: 'app-anim-create-quizz-element-add-question-bloc',
  templateUrl: './anim-create-quizz-element-add-question-bloc.component.html',
  styleUrls: ['./anim-create-quizz-element-add-question-bloc.component.scss']
})
export class AnimCreateQuizzElementAddQuestionBlocComponent implements OnInit {

  public questionType: QuestionType;
  public questionAnswers: Answer[];
  public questionName: string;


  // @Output() questionNameRequest = new EventEmitter<string>();
  @Input() questionNumber: number;
  @Output() question = new EventEmitter<Question>();
  @Output() deleteQuestion = new EventEmitter<boolean>();
  @Output() downTheQuestion = new EventEmitter<boolean>();
  @Output() upTheQuestion = new EventEmitter<boolean>();



  constructor() {
    this.questionType = QuestionType.TEXT;
    this.questionName = '';
    }

  ngOnInit(): void {
  }

  upQuestion(): void {
    console.log('up');
    this.upTheQuestion.emit(true);
    this.question.emit({id: String(this.questionNumber), question_name: this.questionName, type: this.questionType, answers: this.questionAnswers});

  }

  downQuestion(): void {
    console.log('down');
    this.downTheQuestion.emit(true);
    this.question.emit({id: String(this.questionNumber), question_name: this.questionName, type: this.questionType, answers: this.questionAnswers});

  }

  deleteThisQuestion(): void {
    console.log('delete this question');
    this.question.emit({id: String(this.questionNumber), question_name: this.questionName, type: this.questionType, answers: this.questionAnswers});
    this.deleteQuestion.emit(true);

  }

  addAnAnswer(): void {
    console.log('add an answer et the question');
  }

  editQuestionName(event: any): void {
    this.questionName = event.target.value;
    console.log('QUESTION INFO : EDIT NAME : ' + event.target.value);
    this.question.emit({id: String(this.questionNumber), question_name: this.questionName, type: this.questionType, answers: this.questionAnswers});
  }

  /**
   * event = 0 pour une question texte
   * event = 1 pour une question image
   */
  imageOrTextQuestion(event: number): void {
    switch (event) {
      case 0: this.questionType = QuestionType.TEXT; console.log('QUESTION BLOC : textQuestion'); break;
      case 1: this.questionType = QuestionType.IMAGE; console.log('QUESTION BLOC : imgQuestion'); break;
    }
    this.question.emit({id: String(this.questionNumber), question_name: this.questionName, type: this.questionType, answers: this.questionAnswers});
  }



}
