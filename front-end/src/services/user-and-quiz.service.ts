import { Injectable } from '@angular/core';
import {UserAndQuizModel, UserAnswer} from "../models/user-and-quiz.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {
  serverUrl,
  userAndQuizzesGETAll,
  userAndQuizzesGETForOneQuiz,
  userAndQuizzesGETForOneUser
} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UserAndQuizService {


  public userAndQuizs$: BehaviorSubject<UserAndQuizModel[]> = new BehaviorSubject<UserAndQuizModel[]>([]);

  public oneUserQuizzes$: Subject<UserAndQuizModel> = new Subject();




  constructor(private http: HttpClient) {}

  public initializeUserAndQuiz(userId: number): void {
    this.getAllUserAndQuizFromDatabase().subscribe(internUserAndQuizzes => {
      this.setUserAndQuizzes(internUserAndQuizzes);
    });


    this.getUserAndQuizForOneUserFromDatabase(userId).subscribe(internUserAndQuiz => {
      this.setOneUserAndQuiz(internUserAndQuiz.data);
    });

  }

  private getAllUserAndQuizFromDatabase(): Observable<any> {
    return this.http.get<any>(userAndQuizzesGETAll);
  }

  private getUserAndQuizForOneUserFromDatabase(userId: number): Observable<any> {
    return this.http.get<any>(userAndQuizzesGETForOneUser + String(userId));
  }

  private getUserAndQuizForOneQuizFromDatabase(quizId: number): Observable<any> {
    return this.http.get<any>(userAndQuizzesGETForOneQuiz + String(quizId));
  }

  private setOneUserAndQuiz(internUserAndQuiz: UserAndQuizModel): void {
    this.oneUserQuizzes$.next(internUserAndQuiz);
  }

  private setUserAndQuizzes(internUserAndQuiz: UserAndQuizModel[]): void {
    this.userAndQuizs$.next(internUserAndQuiz);
  }

  public getOneUserQuizzesAsObservable(): Observable<UserAndQuizModel> {
    return this.oneUserQuizzes$;
  }

  public getUserAndQuizzes(): Observable<UserAndQuizModel[]> {
    return this.userAndQuizs$;
  }




  /**
   * @deprecated
   */
  setOneUserAndQuizElement(userAndQuiz: UserAndQuizModel): void {
    /*
    this.oneUserQuizzes = userAndQuiz;
    this.oneUserQuizzes$.next(userAndQuiz);
    console.log(this.oneUserQuizzes.id);
    console.log(this.oneUserQuizzes);
    this.http.put<UserAndQuizModel>(this.userUrl + '/' + this.oneUserQuizzes.id, this.oneUserQuizzes).subscribe(data => {});

     */
  }

  /**
   * @deprecated
   */
  setOneUserQuizzes(user: User): void {
    /*
    this.oneUserQuizzes = this.userAndQuizs.find(each => each.id === user.id);
    this.oneUserQuizzes$.next(this.oneUserQuizzes);

     */
  }

  /**
   * @deprecated
   */
  addEmptyPlayedQuizOneUserQuiz(): void {
    /*
    this.oneUserQuizzes = {id: 5000, id_user: 5000, played_quizzes: []};
    this.oneUserQuizzes$.next(this.oneUserQuizzes);

     */
  }




  /**
   * @deprecated
   */
  getOneUserQuizzes(): UserAndQuizModel {
    return null;
  }

  /**
   * @deprecated
   */
  getUserAndQuizs(): UserAndQuizModel[] {
    return null;
  }
}
