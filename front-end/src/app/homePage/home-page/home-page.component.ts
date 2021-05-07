import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Difficulty, Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {UserAndQuizService} from '../../../services/user-and-quiz.service';
import {UserAndQuizModel} from '../../../models/user-and-quiz.model';
import {Subscription} from 'rxjs';
import UserPrefsService from '../../../services/userprefs.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

/**
 * @verified : D'Andréa William - 7 may 2021
 */

export class HomePageComponent implements OnInit, OnDestroy {

  public publicSession: boolean;
  private isPublicSessionSubscription: Subscription;

  public fontSize: number;
  private fontSizeSubscription: Subscription;

  public userSelected: User;
  private userSelectedSubscription: Subscription;

  public quizList: Quiz[] = [];
  private quizListSubscription: Subscription;

  public currentUserAndQuiz: UserAndQuizModel;
  private currentUserAndQuizSubscription: Subscription;

  constructor(private router: Router, public quizService: QuizService, public userService: UserService, private userPrefsService: UserPrefsService, private userAndQuizService: UserAndQuizService) {}

  public ngOnInit(): void {

    this.quizService.initializeQuizzes();

    this.isPublicSessionSubscription = this.userService.isPublicSessionAsObservable().subscribe(internIsPublic => {
      this.publicSession = internIsPublic;

      if (internIsPublic === true) {
        // La session est publique
        this.userSelectedSubscription = new Subscription();
      } else {
        // La session est privée
        this.userSelectedSubscription = this.userService.getCurrentUserAsObservable().subscribe(internCurrentUser => {
          this.userSelected = internCurrentUser;
          this.userAndQuizService.initializeUserAndQuiz(internCurrentUser.id);
        });
      }
    });

    this.currentUserAndQuizSubscription = this.userAndQuizService.getOneUserQuizzesAsObservable().subscribe(internUserAndQuiz => {
      this.currentUserAndQuiz = internUserAndQuiz;
    });

    this.quizListSubscription = this.quizService.getAllQuizzesAsObservable().subscribe(internAllQuizzes => {
      this.quizList = internAllQuizzes;
    });

    this.fontSizeSubscription = this.userPrefsService.getFontSizeAsObservable().subscribe(internFontSize => {
      this.fontSize = internFontSize;
    });
  }


  /**
   * Méthodes qui permet de savoir si le quiz actuel est déjà joué au non, afin d'afficher
   * la petite popup qui indique : nombre de bonne réponse / nombre total de réponses si le quiz
   * a été jouée
   * @param quiz dont on souhaite savoir s'il a été joué ou non
   */
  public isPlayedQuiz(quiz: Quiz): boolean {

    if (this.publicSession) {
      return false;
    }

    return this.currentUserAndQuiz.played_quizzes.map(plQz => plQz.id_quiz).includes(quiz.id);
  }

  /**
   * Méthode permettant de savoir le nombre de bonne réponse donné sur un quiz qui a déjà été joué
   * @param quiz dont on souhaite connaitre le nombre de bonnes réponses de l'uitlisateur
   */
  getNumberOfGoodQuestion(quiz: Quiz): number {

    if (this.userSelected && this.isPlayedQuiz(quiz)) {
      const index = this.currentUserAndQuiz.played_quizzes.findIndex(elem => elem.id_quiz === quiz.id);
      if (index >= 0) {
        return this.currentUserAndQuiz.played_quizzes[index].score_user;
      }
    }

    return 0;
  }

  /**
   * Méthodes interne au HTML permettant de filtrer les quizzes
   */
  onDifficultyFiltrer(choice: Difficulty): void {

    switch (choice) {
      case Difficulty.EASY: this.quizList = this.filterDifficultyEasy(); break;
      case Difficulty.MEDIUM: this.quizList = this.filterDifficultyMedium(); break;
      case Difficulty.HARD: this.quizList = this.filterDifficultyHard(); break;
      case Difficulty.EXPERT: this.quizList = this.filterDifficultyExpert(); break;
      default: {this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => this.quizList = quizzes); }
    }
  }

  filterDifficultyEasy(): Quiz[] {
    return this.quizList.filter((quiz) => quiz.difficulty === Difficulty.EASY);
  }


  filterDifficultyMedium(): Quiz[] {
    return this.quizList.filter((quiz) => quiz.difficulty === Difficulty.MEDIUM);
  }

  filterDifficultyHard(): Quiz[] {
    return this.quizList.filter((quiz) => quiz.difficulty === Difficulty.HARD);
  }


  filterDifficultyExpert(): Quiz[] {
    return this.quizList.filter((quiz) => quiz.difficulty === Difficulty.EXPERT);
  }

  /**
   * Navigation vers la page de description de quiz
   * Le then() est important ici car il nous permet de correctement liée les pages car à partir de cette page,
   * nous allons modifier des informations directement dans les services
   */
  public onSelectedQuiz(event: Quiz): void {
    this.router.navigate(['/quiz-intro']).then(() => {
      if (!this.publicSession) {
        this.userService.setCurrentUser(this.userSelected.id);
        this.userAndQuizService.initializeUserAndQuiz(this.userSelected.id);
      } else {
        this.userAndQuizService.initializePublicOneUserAndQuiz();
      }
      this.quizService.setSelectedQuiz(event.id);
    });
  }

  /**
   * Navigation vers la page de login avec reload de la page pour s'assurer de la remise à zéro des services
   */
  public disconnect(): void {
    this.router.navigate(['/login']).then(() => window.location.reload());
  }


  ngOnDestroy(): void {
    this.userSelectedSubscription.unsubscribe();
    this.fontSizeSubscription.unsubscribe();
    this.currentUserAndQuizSubscription.unsubscribe();
    this.isPublicSessionSubscription.unsubscribe();
    this.quizListSubscription.unsubscribe();
  }

}
