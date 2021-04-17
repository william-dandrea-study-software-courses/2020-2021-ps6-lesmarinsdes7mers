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
export class AnimCreateQuizzElementAddQuestionBlocImageComponent implements OnInit {

  @Input() answers: Answer[] = []
  
  public urlUnsplash = 'https://api.unsplash.com/search/photos?client_id=-ozCm-naWd_KecnLbpIiqBpdGocbKH_IXgFblJ4CjSQ&query=';


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  onClickAddPhotoLocal(answer: Answer, themeSearch: any): void {
    answer.data = themeSearch.target.value;
  }

  onClickAddPhotoSearch(answer: Answer, themeSearch: any): void {
    this.onSearchPhoto(themeSearch.target.value, answer);
  }


  onSearchPhoto(searchValue: string, answer: Answer): void {

    //this.listOfUrls.length = 0;
    const url = 'https://api.unsplash.com/search/photos?client_id=-ozCm-naWd_KecnLbpIiqBpdGocbKH_IXgFblJ4CjSQ&query=' + searchValue;

    this.http
        .get<IUnsplashRequest>(url)
        .subscribe(response => {
          const urls: IUnsplashUrls[][] = response.results.map(res2 => res2.urls);
          let goodUrls: IUnsplashUrls[] = [];
          for (let i = 0; i < urls.length; i++)
          {
            goodUrls = goodUrls.concat(urls[i]);
          }


          goodUrls.forEach(val => {
            //this.listOfUrls.push(val.regular);
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
    this.answers.forEach(((value, index) => {
      if (value === event) {
        this.answers.splice(index, 1);
      }
    }));
  }


}
