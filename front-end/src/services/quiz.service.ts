import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import {Question, Quiz} from '../models/quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizzes: Quiz[] = [];
  private quizSelected: Quiz;

  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public quizSelected$: Subject<Quiz> = new Subject();

  private quizUrl = serverUrl + '/quizz';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveQuizzes();
  }

  retrieveQuizzes(): void {
    this.http.get<any>(this.quizUrl + '/all').subscribe((quizList) => {
      this.quizzes = quizList.data;
      this.quizzes$.next(this.quizzes);
    });
  }

  getQuizSelected(): Quiz {
    return this.quizSelected;
  }

  addQuiz(quiz: Quiz): void {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  setSelectedQuiz(quizId: number): void {

    this.quizSelected = this.quizzes.find(value => value.id === quizId);
    this.quizSelected$.next(this.quizSelected);
  }


  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuizzes());
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
