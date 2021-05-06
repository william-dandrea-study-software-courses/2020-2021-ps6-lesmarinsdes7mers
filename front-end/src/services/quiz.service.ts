import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Question, Quiz} from '../models/quiz.model';
import {
  serverUrl,
  httpOptionsBase,
  quizzesGETAllQuizzes,
  quizzesGETAllPublicQuizzes,
  quizzesGETAllQuizzesAvailableForOneUser
} from '../configs/server.config';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizzes: Quiz[] = [];
  private quizSelected: Quiz;

  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public quizSelected$: Subject<Quiz> = new Subject();

  private currentCorrectionSelected: number;
  public currentCorrectionSelected$: Subject<number> = new Subject<number>();

  private quizUrl = serverUrl + '/quizz';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;

  public publicSession: boolean;

  constructor(private http: HttpClient, private userService: UserService) {






    /*
    this.retrieveQuizzes();

    this.publicSession = this.userService.getPublicSession();
    if (this.publicSession) {
      this.quizzes = this.quizzes.filter(quiz => quiz.privacy.is_public === true);
      this.quizzes$.next(this.quizzes);
    }
     */
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





  /**
   * @deprecated
   */
  retrieveQuizzes() {
    const result = this.http.get<any>(this.quizUrl + '/all');
    result.subscribe((quizList) => {
      this.quizzes = quizList.data;
      this.quizzes$.next(this.quizzes);
    });
    return result;
  }

  /**
   * @deprecated
   */
  getPublicQuizzes(): Quiz[] {
    const elements =  this.quizzes.filter(quiz => quiz.privacy.is_public === true);
    this.quizzes = elements;
    this.quizzes$.next(elements);
    return elements;
  }

  /**
   * @deprecated
   */
  getQuizForOneUser(idUser: number): Quiz[] {
    let finalArray = this.quizzes.filter(quiz => quiz.privacy.users_access.includes(idUser));
    finalArray = [...finalArray, ...this.getPublicQuizzes()];
    const finalValue = [...new Set(finalArray)];
    this.quizzes$.next(finalValue);
    return finalValue;
  }






  /**
   * @deprecated
   */
  setCurrentQuestionSelected(idQuestion: number): void {
    this.currentCorrectionSelected = idQuestion;
    this.currentCorrectionSelected$.next(this.currentCorrectionSelected);
  }

  /**
   * @deprecated
   */
  getCurrentQuestionSelected(): number {
    return this.currentCorrectionSelected;
  }





  /**
   * @deprecated
   */
  getQuizSelected(): Quiz {
    return this.quizSelected;
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

  /**
   * @deprecated
   */
  setSelectedQuiz(quizId: number): void {

    this.quizSelected = this.quizzes.find(value => value.id === quizId);
    this.quizSelected$.next(this.quizSelected);
  }


  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuizzes());
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
