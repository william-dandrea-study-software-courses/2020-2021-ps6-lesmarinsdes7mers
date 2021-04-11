import {Component, Input, OnInit, Output, EventEmitter, DoCheck, OnChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUnsplashRequest, IUnsplashUrls} from "../../../../../../../models/unsplash.model";
import {element} from "protractor";
import {NgForm} from "@angular/forms";
import {Answer} from "../../../../../../../models/quiz.model";

@Component({
  selector: 'app-anim-create-quizz-element-add-question-bloc-image',
  templateUrl: './anim-create-quizz-element-add-question-bloc-image.component.html',
  styleUrls: ['./anim-create-quizz-element-add-question-bloc-image.component.scss']
})
export class AnimCreateQuizzElementAddQuestionBlocImageComponent implements OnInit, DoCheck, OnChanges  {

  @Input() numberOfAnswersListener: number;
  @Output() answersEmitter = new EventEmitter<Answer[]>();

  public listOfAnswers: Answer[] = new Array();
  public urlUnsplash = 'https://api.unsplash.com/search/photos?client_id=-ozCm-naWd_KecnLbpIiqBpdGocbKH_IXgFblJ4CjSQ&query=';
  public listOfUrls: string[] = new Array();


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.numberOfAnswersListener) {
      this.listOfAnswers.push({is_correct: false, data: ''});
      console.log('====<<>>');
    }
  }

  ngDoCheck(): void {
    if (this.listOfAnswers) {
      this.answersEmitter.emit(this.listOfAnswers);
    }
  }


  onClickAddPhotoLocal(answer: Answer, themeSearch: any): void {

    answer.data = themeSearch.target.value;


  }

  onClickAddPhotoSearch(answer: Answer, themeSearch: any): void {

    this.onSearchPhoto(themeSearch.target.value, answer);


  }


  onSearchPhoto(searchValue: string, answer: Answer): void {

    this.listOfUrls.length = 0;

    this.http
        .get<IUnsplashRequest>('https://api.unsplash.com/search/photos?client_id=-ozCm-naWd_KecnLbpIiqBpdGocbKH_IXgFblJ4CjSQ&query=' + searchValue)
        .subscribe(response => {
          const urls: IUnsplashUrls[][] = response.results.map(res2 => res2.urls);
          let goodUrls: IUnsplashUrls[] = [];
          for (let i = 0; i < urls.length; i++)
          {
            goodUrls = goodUrls.concat(urls[i]);
          }


          goodUrls.forEach(val => {
            this.listOfUrls.push(val.regular);
            // console.log(val.regular.toString());
            answer.data = val.regular.toString();
          });
          // urls.forEach(value => value.forEach(value1 => finalData.add(value1.regular)));
        });

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


}
