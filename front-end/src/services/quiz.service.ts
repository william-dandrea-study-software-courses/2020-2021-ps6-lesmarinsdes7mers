import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Question, Quiz} from '../models/quiz.model';
import {
  serverUrl,
  httpOptionsBase,
  quizzesGETAllQuizzes,
  quizzesGETAllPublicQuizzes,
  quizzesGETAllQuizzesAvailableForOneUser, quizzesGETOneQuiz, userAndQuizzesDELETEUserAndQuizForOneQuiz
} from '../configs/server.config';
import {UserService} from "./user.service";
import {UserAndQuizService} from "./user-and-quiz.service";
import {UserAndQuizModel} from "../models/user-and-quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizzes: Quiz[] = [];
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  private quizSelected: Quiz;
  public quizSelected$: Subject<Quiz> = new Subject();

  private currentCorrectionSelected: number;
  public currentCorrectionSelected$: Subject<number> = new Subject<number>();

  private quizUrl = serverUrl + '/quizz';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private userService: UserService) {

    this.getAllQuizzesFromDatabase().subscribe({ next: qs => this.setQuizzes(qs.data) })
  }


  public initializeQuizzes(): void {
    this.userService.isPublicSessionAsObservable().subscribe(isInternPublicSession => {
      if (isInternPublicSession) {
        // La session est publique, on ne récupère que les quizzes publiques
        this.getAllPublicQuizzesFromDatabase().subscribe(internAllPublicQuizzes => {
          this.setQuizzes(internAllPublicQuizzes.data);
        });
      } else {
        // La session est privée, on récupère les quizzes pour un utilisateur
        this.userService.getCurrentUserAsObservable().subscribe(internCurrentUser => {
          this.getAllQuizzesForOneUserFromDatabase(internCurrentUser.id).subscribe(internAllUserQuizzes => {
            this.setQuizzes(internAllUserQuizzes.data);
          });
        });
      }
    });
  }

  public setSelectedQuiz(quizId: number): void {
    this.quizSelected = this.quizzes?.find(d => d.id === quizId) || undefined

    this.getOneQuizFromDatabase(quizId).subscribe(value => {
      this.quizSelected = value.data;
      this.quizSelected$.next(value.data);
    });
    this.quizSelected$.next(this.quizSelected);
  }


  private getAllQuizzesFromDatabase(): Observable<any> {
    return this.http.get<any>(quizzesGETAllQuizzes);
  }

  private getAllPublicQuizzesFromDatabase(): Observable<any> {
    return this.http.get<any>(quizzesGETAllPublicQuizzes);
  }

  private getAllQuizzesForOneUserFromDatabase(idUser: number): Observable<any> {
    return this.http.get<any>(quizzesGETAllQuizzesAvailableForOneUser + String(idUser));
  }

  private getOneQuizFromDatabase(idQuiz: number): Observable<any> {
    return this.http.get<any>(quizzesGETOneQuiz + String(idQuiz));
  }


  public getAllQuizzesAsObservable(): Observable<any> {
    return this.quizzes$;
  }

  public getAllQuizzes(): Quiz[] {
    return this.quizzes;
  }

  public getQuizSelectedAsObservable(): Observable<any> {
    return this.quizSelected$;
  }

  public getQuizSelected(): Quiz {
    return this.quizSelected;
  }

  public getOneQuiz(idQuiz: number): Quiz {

    const indexQuiz = this.quizzes.findIndex(internQuiz => internQuiz.id === idQuiz);

    if (indexQuiz >= 0) {
      return this.quizzes[indexQuiz];
    } else {
      return null;
    }
  }

  public getCurrentCorrectionSelectedAsObservable(): Observable<any> {
    return this.currentCorrectionSelected$;
  }

  public setQuizzes(internQuizzes: Quiz[]): void {
    this.quizzes = internQuizzes;
    this.quizzes$.next(internQuizzes);
  }

  public setCurrentQuestionSelected(idQuestion: number): void {
    this.currentCorrectionSelected = idQuestion;
    this.currentCorrectionSelected$.next(this.currentCorrectionSelected);
  }


  public getCurrentQuestionSelected(): number {
    return this.currentCorrectionSelected;
  }














  retrieveQuizzes() {
    const result = this.http.get<any>(this.quizUrl + '/all');
    result.subscribe((quizList) => {
      this.quizzes = quizList.data;
      this.quizzes$.next(this.quizzes);
    });
    return result;
  }


  addQuiz(quiz: Quiz) {
    const resultSubject = new Subject<Quiz>()
    const result = this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions)
    result.subscribe((quiz) => {
      this.retrieveQuizzes()
      resultSubject.next(quiz)
    });
    return resultSubject;
  }




  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuizzes());

    this.http.delete<UserAndQuizModel>(userAndQuizzesDELETEUserAndQuizForOneQuiz + String(quiz.id), this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  updateQuiz(quiz: Quiz) {

    const q = Object.assign({}, quiz);

    if(quiz.id === undefined) {
      console.log("Create quiz")
      const s = this.addQuiz(q);
      s.subscribe({ next: n => quiz.id = q.id });
      return s
    } else {
      console.log("Update quiz")
      const result = new Subject<Quiz>()
      const s = this.http.put<Quiz>(this.quizUrl + "/" + q.id, quiz, this.httpOptions)
      s.subscribe({ next: n => {
        quiz.id = q.id
        this.retrieveQuizzes()
        result.next(n)
      }});

      return result
    }
  }

  addQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }
}
