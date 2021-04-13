import {Component, Input, OnInit, Output, EventEmitter, DoCheck} from '@angular/core';
import {Answer, Question, QuestionType} from "../../../../../../../models/quiz.model";

@Component({
  selector: 'app-anim-create-quizz-element-add-question-bloc',
  templateUrl: './anim-create-quizz-element-add-question-bloc.component.html',
  styleUrls: ['./anim-create-quizz-element-add-question-bloc.component.scss']
})
export class AnimCreateQuizzElementAddQuestionBlocComponent implements OnInit, DoCheck {

  public questionType: QuestionType;
  public questionAnswers: Answer[];
  public questionName: string;
  public numberOfAnswers: number;

  public nameCssClassSwitchTxtImgOne: string;
  public nameCssClassSwitchTxtImgTwo: string;
  public nameCssClassSwitchTxtImg: string;


  // @Output() questionNameRequest = new EventEmitter<string>();
  @Input() questionNumber: number;
  @Output() question = new EventEmitter<Question>();
  @Output() deleteQuestion = new EventEmitter<number>();
  @Output() downTheQuestion = new EventEmitter<void>();
  @Output() upTheQuestion = new EventEmitter<void>();
  @Output() listOfAnswers = new EventEmitter<Answer[]>();




  constructor() {
  }

  ngOnInit(): void {
    this.questionType = QuestionType.TEXT;
    this.questionName = '';
    this.numberOfAnswers = 1;
    this.nameCssClassSwitchTxtImgOne = 'radio-switch-textuel-img-one' + String(this.questionNumber);
    this.nameCssClassSwitchTxtImgTwo = 'radio-switch-textuel-img-two' + String(this.questionNumber);
    this.nameCssClassSwitchTxtImg = 'switch-textuel-image' + String(this.questionNumber);

    console.log(this.nameCssClassSwitchTxtImg);
  }

  ngDoCheck(): void {
  }

  upQuestion(): void {
    console.log('up');
    this.upTheQuestion.emit();
    this.question.emit();

  }

  downQuestion(): void {
    console.log('down');
    this.downTheQuestion.emit();
    this.question.emit();

  }

  deleteThisQuestion(): void {
    console.log('delete this question');
    this.question.emit({id: String(this.questionNumber), question_name: this.questionName, type: this.questionType, answer: this.questionAnswers});
    this.deleteQuestion.emit(this.questionNumber);

  }

  addAnAnswer(): void {
    if(this.numberOfAnswers < 4) {
      console.log('add an answer et the question');
      this.numberOfAnswers++;
    }
  }

  editQuestionName(event: any): void {
    this.questionName = event.target.value;
    console.log('QUESTION INFO : EDIT NAME : ' + event.target.value);
    this.question.emit({id: String(this.questionNumber), question_name: this.questionName, type: this.questionType, answer: this.questionAnswers});
  }

  /**
   * event = 0 pour une question texte
   * event = 1 pour une question image
   */
  imageOrTextQuestion(event: number): void {
    switch (event) {
      case 0: this.questionType = QuestionType.TEXT; console.log('QUESTION BLOC ' + String(this.questionNumber) + ' : textQuestion'); break;
      case 1: this.questionType = QuestionType.IMAGE; console.log('QUESTION BLOC ' + String(this.questionNumber) + ' : imgQuestion'); break;
    }
    this.question.emit({id: String(this.questionNumber), question_name: this.questionName, type: this.questionType, answer: this.questionAnswers});
  }

  editListOfAnswer(event: Answer[]): void {
    this.listOfAnswers.emit(event);
  }


}
