import { Injectable } from '@angular/core';
import {UserAndQuizModel, UserAnswer} from "../models/user-and-quiz.model";
import {BehaviorSubject, Subject} from "rxjs";
import {serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserAndQuizService {

  private userAndQuizs: UserAndQuizModel[] = [];
  public userAndQuizs$: BehaviorSubject<UserAndQuizModel[]> = new BehaviorSubject<UserAndQuizModel[]>([]);

  private oneUserQuizzes: UserAndQuizModel;
  public oneUserQuizzes$: Subject<UserAndQuizModel> = new Subject();


  private userUrl = serverUrl + '/userandquiz';
  private allUrl = this.userUrl + '/all';

  constructor(private http: HttpClient) {
    this.retrieveAllUserAndQuiz();
  }

  retrieveAllUserAndQuiz(): void {
    this.http.get<any>(this.allUrl).subscribe((eachUserAndQuiz) => {
      this.userAndQuizs = eachUserAndQuiz.data;
      this.userAndQuizs$.next(this.userAndQuizs);
    });
  }

  setOneUserQuizzes(user: User): void {
    this.oneUserQuizzes = this.userAndQuizs.find(each => each.id === user.id);
    this.oneUserQuizzes$.next(this.oneUserQuizzes);
  }

  setAnswersForOneUserQuizzes(idQuiz: number, scoreUser: number, answers: UserAnswer[]): void {
    let temp_maded_quiz = this.oneUserQuizzes.maded_quizzes;
    temp_maded_quiz.push({id_quiz: idQuiz, score_user: scoreUser, user_answers: answers});

    console.log(temp_maded_quiz);
    this.oneUserQuizzes.maded_quizzes = temp_maded_quiz;
    this.oneUserQuizzes$.next(this.oneUserQuizzes);
  }

  getOneUserQuizzes(): UserAndQuizModel {
    return this.oneUserQuizzes;
  }

  getUserAndQuizs(): UserAndQuizModel[] {
    return this.userAndQuizs;
  }



  validateQuizAndPutToDatabase(): void {

  }
}
