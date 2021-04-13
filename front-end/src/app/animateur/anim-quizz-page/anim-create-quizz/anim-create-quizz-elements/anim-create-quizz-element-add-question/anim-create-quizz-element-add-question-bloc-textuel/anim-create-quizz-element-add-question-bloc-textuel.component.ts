import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  SimpleChange,
  SimpleChanges,
  OnChanges,
  DoCheck
} from '@angular/core';
import {Answer} from "../../../../../../../models/quiz.model";

@Component({
  selector: 'app-anim-create-quizz-element-add-question-bloc-textuel',
  templateUrl: './anim-create-quizz-element-add-question-bloc-textuel.component.html',
  styleUrls: ['./anim-create-quizz-element-add-question-bloc-textuel.component.scss']
})
export class AnimCreateQuizzElementAddQuestionBlocTextuelComponent implements OnInit {
  
  @Input() answers: Answer[] = []

  constructor() { }


  ngOnInit(): void {
  }


  onCorrectAnswer(event: Answer): void {
    event.is_correct = (event.is_correct !== true);
  }

  onDeleteAnswer(event: Answer): void {
    this.answers.forEach(((value, index) => {
      if (value === event) {
        this.answers.splice(index, 1);
      }
    }));
  }

  onEditAnswerText(event: any, answer: Answer): void {
    answer.data = String(event.target.value);
  }



}
