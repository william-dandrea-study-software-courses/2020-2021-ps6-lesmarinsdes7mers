import {Component, Input, OnInit, Output, EventEmitter, DoCheck} from '@angular/core';
import {Answer, Question, QuestionType} from "../../../../../../../models/quiz.model";

@Component({
  selector: 'app-anim-create-quizz-element-add-question-bloc',
  templateUrl: './anim-create-quizz-element-add-question-bloc.component.html',
  styleUrls: ['./anim-create-quizz-element-add-question-bloc.component.scss']
})
export class AnimCreateQuizzElementAddQuestionBlocComponent implements OnInit, DoCheck {

  @Input() question: Question = {
    id: undefined,
    answer: [{
      data: "",
      is_correct: true,
      id_answer: 1
    }],
    question_name: "",
    type: QuestionType.TEXT
  }


  @Output() up: EventEmitter<void> = new EventEmitter()
  @Output() down: EventEmitter<void> = new EventEmitter()
  @Output() delete: EventEmitter<void> = new EventEmitter()



  constructor() {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }

  upQuestion(): void {
    console.log('up');
    this.up.emit();
  }

  downQuestion(): void {
    console.log('down');
    this.down.emit();
  }
  
  deleteThisQuestion(): void {
    this.delete.emit()
  }

  addAnAnswer(): void {
    this.question.answer.push({
      data: "",
      id_answer: this.question.answer.length + 1,
      is_correct: this.question.answer.find(a => a.is_correct) === undefined
    })
  }

  editQuestionName(event: any): void {
    this.question.question_name = event.target.value
  }

  /**
   * event = 0 pour une question texte
   * event = 1 pour une question image
   */
  imageOrTextQuestion(event: number): void {
    if(event === 0) this.question.type = QuestionType.TEXT
    else this.question.type = QuestionType.IMAGE
  }


}
