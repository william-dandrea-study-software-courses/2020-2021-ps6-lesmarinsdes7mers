import { Injectable } from '@angular/core';
import {MadedQuizzesModel, UserAndQuizModel, UserAnswer} from "../models/user-and-quiz.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {
  serverUrl,
  userAndQuizzesGETAll,
  userAndQuizzesGETForOneQuiz,
  userAndQuizzesGETForOneUser, userAndQuizzesPOSTAddOneUserAndQuiz
} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UserAndQuizService {


  private userAndQuizs: UserAndQuizModel[];
  public userAndQuizs$: BehaviorSubject<UserAndQuizModel[]> = new BehaviorSubject<UserAndQuizModel[]>([]);

  private oneUserQuizzes: UserAndQuizModel;
  public oneUserQuizzes$: Subject<UserAndQuizModel> = new Subject();



  constructor(private http: HttpClient) {}

  public initializeUserAndQuiz(userId: number): void {

    this.getAllUserAndQuizFromDatabase().subscribe(internUserAndQuizzes => {
      this.setUserAndQuizzes(internUserAndQuizzes.data);
    });

    if (userId !== -1) {
      this.getUserAndQuizForOneUserFromDatabase(userId).subscribe(internUserAndQuiz => {
        this.setOneUserAndQuiz(internUserAndQuiz.data);
      });
    }
  }

  public initializePublicOneUserAndQuiz(): void {
    this.setOneUserAndQuiz({id: 1000, id_user: 1000, played_quizzes: []});
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
    this.oneUserQuizzes = internUserAndQuiz;
    this.oneUserQuizzes$.next(internUserAndQuiz);
  }

  private setUserAndQuizzes(internUserAndQuiz: UserAndQuizModel[]): void {
    this.userAndQuizs = internUserAndQuiz;
    this.userAndQuizs$.next(internUserAndQuiz);
  }

  public getOneUserQuizzesAsObservable(): Observable<UserAndQuizModel> {
    return this.oneUserQuizzes$;
  }

  getOneUserQuizzes(): UserAndQuizModel {
    return this.oneUserQuizzes;
  }

  public getUserAndQuizzesAsObservable(): Observable<UserAndQuizModel[]> {
    return this.userAndQuizs$;
  }

  public getUserAndQuizs(): UserAndQuizModel[] {
    return this.userAndQuizs;
  }



  public setOneUserAndQuizElementForUser(userAndQuiz: UserAndQuizModel, idUser: number, idQuiz: number): void {
    this.oneUserQuizzes = userAndQuiz;
    this.oneUserQuizzes$.next(userAndQuiz);
    this.http.put<UserAndQuizModel>(userAndQuizzesPOSTAddOneUserAndQuiz + String(idUser), userAndQuiz).subscribe(data => {});
  }

  public setOneUserAndQuizElementWhenPublic(userAndQuiz: UserAndQuizModel): void {
    this.oneUserQuizzes = userAndQuiz;
    this.oneUserQuizzes$.next(userAndQuiz);
  }





  /**
   * @deprecated
   */
  setOneUserQuizzes(user: User): void {
    this.oneUserQuizzes = this.userAndQuizs.find(each => each.id === user.id);
    this.oneUserQuizzes$.next(this.oneUserQuizzes);
  }
}
