import {Component, Input, OnInit, Output, EventEmitter, DoCheck, OnChanges} from '@angular/core';
import {Answer} from "../../../../../../../models/quiz.model";
import {UnplashService} from "../../../../../../../services/unplash.service";

@Component({
  selector: 'app-anim-create-quizz-element-add-question-bloc-image',
  templateUrl: './anim-create-quizz-element-add-question-bloc-image.component.html',
  styleUrls: ['./anim-create-quizz-element-add-question-bloc-image.component.scss']
})
export class AnimCreateQuizzElementAddQuestionBlocImageComponent implements OnInit {

  @Input() answers: Answer[] = []
  
  constructor(private unplash: UnplashService) { }

  ngOnInit(): void {
  }


  onClickAddPhotoLocal(answer: Answer, themeSearch: any): void {
    answer.data = themeSearch.target.value;
  }

  onClickAddPhotoSearch(answer: Answer, themeSearch: any): void {
    this.unplash.searchPhoto(themeSearch.target.value).then(value => answer.data = value);
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


}
