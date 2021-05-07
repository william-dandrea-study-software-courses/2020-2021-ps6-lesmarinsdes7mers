import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Difficulty, Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";
import {UserService} from "../../../services/user.service";
import {ConfigSizeFont, User} from "../../../models/user.model";
import {UserAndQuizService} from "../../../services/user-and-quiz.service";
import {UserAndQuizModel} from "../../../models/user-and-quiz.model";
import {Subscription} from "rxjs";
import UserPrefsService from "../../../services/userprefs.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
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

  public difficultyFiltrer: Difficulty;

  constructor(private router: Router, public quizService: QuizService, public userService: UserService, private userPrefsService: UserPrefsService, private userAndQuizService: UserAndQuizService) {}

  ngOnInit(): void {

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
          this.userPrefsService.initializePrefsForOneUser(internCurrentUser);
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





  isPlayedQuiz(quiz: Quiz): boolean {

    if (this.publicSession) {
      return false;
    }

    return this.currentUserAndQuiz.played_quizzes.map(plQz => plQz.id_quiz).includes(quiz.id);
  }

  getNumberOfGoodQuestion(quiz: Quiz): number {

    if (this.userSelected && this.isPlayedQuiz(quiz)) {
      const index = this.currentUserAndQuiz.played_quizzes.findIndex(elem => elem.id_quiz === quiz.id);
      if (index >= 0) {
        return this.currentUserAndQuiz.played_quizzes[index].score_user;
      }
    }

    return 0;
  }

  // routerLink="/quiz-intro/{{idQuiz}}
  onSelectedQuiz(event: Quiz): void {

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


  deconnect(): void {
    this.router.navigate(["/login"]).then(() => window.location.reload());
  }







  onDifficultyFiltrer(choice: Difficulty): void {
    this.difficultyFiltrer = choice;

    switch (this.difficultyFiltrer) {
      case Difficulty.EASY: this.quizList = this.filterDifficultyEasy(); break;
      case Difficulty.MEDIUM: this.quizList = this.filterDifficultyMedium(); break;
      case Difficulty.HARD: this.quizList = this.filterDifficultyHard(); break;
      case Difficulty.EXPERT: this.quizList = this.filterDifficultyExpert(); break;
      default: {this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => this.quizList = quizzes);}
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

  ngOnDestroy(): void {
    this.userSelectedSubscription.unsubscribe();
    this.fontSizeSubscription.unsubscribe();
    this.currentUserAndQuizSubscription.unsubscribe();
    this.isPublicSessionSubscription.unsubscribe();
    this.quizListSubscription.unsubscribe();
  }

}
