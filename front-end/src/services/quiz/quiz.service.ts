import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Question, Quiz} from '../../models/quiz.model';
import {
  serverUrl,
  httpOptionsBase,
  quizzesGETAllQuizzes,
  quizzesGETAllPublicQuizzes,
  quizzesGETAllQuizzesAvailableForOneUser, quizzesGETOneQuiz, userAndQuizzesDELETEUserAndQuizForOneQuiz
} from '../../configs/server.config';
import {UserService} from '../user/user.service';
import {UserAndQuizModel} from "../../models/user-and-quiz.model";

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
    this.getAllQuizzesFromDatabase().subscribe({ next: qs => this.setQuizzes(qs.data) });
  }

  /**
   * Récupère les quiz sur la base de données suivant le type de session
   */
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

  /**
   * Met un quiz comme sélectionné et prévient les observateurs du changement
   * @param quizId L'id du quiz à mettre comme sélectionné
   */
  public setSelectedQuiz(quizId: number): void {
    this.quizSelected = this.quizzes?.find(d => d.id === quizId) || undefined;

    this.getOneQuizFromDatabase(quizId).subscribe(value => {
      this.quizSelected = value.data;
      this.quizSelected$.next(value.data);
    });
    this.quizSelected$.next(this.quizSelected);
  }

  /**
   * Récupère tout les quiz sur la base de données
   */
  private getAllQuizzesFromDatabase(): Observable<any> {
    return this.http.get<any>(quizzesGETAllQuizzes);
  }

  /**
   * Récupère tout les quiz publiques sur la base de données
   */
  private getAllPublicQuizzesFromDatabase(): Observable<any> {
    return this.http.get<any>(quizzesGETAllPublicQuizzes);
  }

  /**
   * Récupère tout les quiz d'un utilisateur sur la base de données
   * @param idUser L'id de l'utilisateur
   */
  private getAllQuizzesForOneUserFromDatabase(idUser: number): Observable<any> {
    return this.http.get<any>(quizzesGETAllQuizzesAvailableForOneUser + String(idUser));
  }

  /**
   * Récupère un quiz sur la base de données
   * @param idQuiz L'id du quiz
   */
  private getOneQuizFromDatabase(idQuiz: number): Observable<any> {
    return this.http.get<any>(quizzesGETOneQuiz + String(idQuiz));
  }

  /**
   * Retourne un observateur sur les quiz
   */
  public getAllQuizzesAsObservable(): Observable<any> {
    return this.quizzes$;
  }

  /**
   * Retourne les quiz qui sont en cache
   */
  public getAllQuizzes(): Quiz[] {
    return this.quizzes;
  }

  /**
   * Retourne un observateur sur le quiz sélectionné
   */
  public getQuizSelectedAsObservable(): Observable<any> {
    return this.quizSelected$;
  }

  /**
   * Retourne le quiz sélectionné qui est en cache
   */
  public getQuizSelected(): Quiz {
    return this.quizSelected;
  }

  /**
   * Retourne un quiz à partir de son id, ou null
   * @param idQuiz L'id du quiz
   */
  public getOneQuiz(idQuiz: number): Quiz {

    const indexQuiz = this.quizzes.findIndex(internQuiz => internQuiz.id === idQuiz);

    if (indexQuiz >= 0) {
      return this.quizzes[indexQuiz];
    } else {
      return null;
    }
  }

  /**
   * Retourne un observateur sur le quiz corrigé sélectionné
   */
  public getCurrentCorrectionSelectedAsObservable(): Observable<any> {
    return this.currentCorrectionSelected$;
  }

  /**
   * Met les quiz en cache et prévient les observateurs
   * @param internQuizzes Les quiz à mettre en cache
   */
  public setQuizzes(internQuizzes: Quiz[]): void {
    this.quizzes = internQuizzes;
    this.quizzes$.next(internQuizzes);
  }

  /**
   * Met la question comme sélectionné et prévient les observateurs
   * @param idQuestion L'id de la question
   */
  public setCurrentQuestionSelected(idQuestion: number): void {
    this.currentCorrectionSelected = idQuestion;
    this.currentCorrectionSelected$.next(this.currentCorrectionSelected);
  }

  /**
   * Donne l'id de la question sélectionné
   */
  public getCurrentQuestionSelected(): number {
    return this.currentCorrectionSelected;
  }

  /**
   * Récupère les quiz sur la base de données et les met en cache
   */
  retrieveQuizzes(): Observable<any> {
    const result = this.getAllQuizzesFromDatabase();
    result.subscribe((quizList) => {
      this.quizzes = quizList.data;
      this.quizzes$.next(this.quizzes);
    });
    return result;
  }

  /**
   * Ajoute le quiz dans la base de données et recharge les quiz en cache
   * @param quiz Le quiz à ajouter
   */
  addQuiz(quiz: Quiz): Subject<Quiz> {
    const resultSubject = new Subject<Quiz>();
    const result = this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions);
    result.subscribe((value) => {
      this.retrieveQuizzes();
      resultSubject.next(value);
    });
    return resultSubject;
  }

  /**
   * Supprime un quiz de la base de données puis recharge les quiz en cache
   * @param quiz Le quiz à supprimer
   */
  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuizzes());

    this.http.delete<UserAndQuizModel>(userAndQuizzesDELETEUserAndQuizForOneQuiz + String(quiz.id), this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  /**
   * Met à jour un quiz ou l'ajoute s'il n'est pas enregistré, et met à jour les quiz en cache
   * @param quiz La quiz à ajouter
   */
  updateQuiz(quiz: Quiz): Subject<Quiz> {

    const q = Object.assign({}, quiz);

    if (quiz.id === undefined) {
      console.log('Create quiz');
      const s = this.addQuiz(q);
      s.subscribe({ next: n => quiz.id = q.id });
      return s;
    } else {
      console.log('Update quiz');
      const result = new Subject<Quiz>();
      const s = this.http.put<Quiz>(this.quizUrl + '/' + q.id, quiz, this.httpOptions);
      s.subscribe({ next: n => {
        quiz.id = q.id;
        this.retrieveQuizzes();
        result.next(n);
      }});

      return result;
    }
  }

  /**
   * Ajoute une question dans la base de données
   * @param quiz Le quiz où se trouve la question
   * @param question La question à ajouter
   */
  addQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  /**
   * Supprime une question de la base de données
   * @param quiz Le quiz où se trouve la question
   * @param question La question à supprimer
   */
  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

}
