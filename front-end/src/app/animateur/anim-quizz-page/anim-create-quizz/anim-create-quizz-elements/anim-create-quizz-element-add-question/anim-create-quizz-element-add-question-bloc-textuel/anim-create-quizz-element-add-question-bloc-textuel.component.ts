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
export class AnimCreateQuizzElementAddQuestionBlocTextuelComponent implements OnInit, OnChanges, DoCheck {
  constructor() { }


  public listOfAnswers: Answer[] = new Array();

  @Input() numberOfAnswersListener: number;
  @Output() answersEmitter = new EventEmitter<Answer[]>();


  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.listOfAnswers) {
      console.log('ADD ANSWER TEXTUEL : emit answers to QUESTION BLOC with answersEmitter');
      this.answersEmitter.emit(this.listOfAnswers);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.numberOfAnswersListener) {
      this.listOfAnswers.push({is_correct: false, data: ''});

    }


  }


  onCorrectAnswer(event: Answer): void {
    event.is_correct = (event.is_correct !== true);
  }

  onDeleteAnswer(event: Answer): void {
    this.listOfAnswers.forEach(((value, index) => {
      if (value === event) {
        this.listOfAnswers.splice(index, 1);
      }
    }));
  }

  onEditAnswerText(event: any, answer: Answer): void {
    answer.data = String(event.target.value);
  }



}
