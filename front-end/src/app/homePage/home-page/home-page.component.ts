import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import UserPrefsService from "../../../services/userprefs.service";
import {Difficulty, Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {UserAndQuizService} from "../../../services/user-and-quiz.service";
import {UserAndQuizModel} from "../../../models/user-and-quiz.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public fontSize: number;
  public quizList: Quiz[] = [];
  public difficultyFiltrer: Difficulty;


  public userSelected: User;

  public currentUserAndQuiz: UserAndQuizModel;


  // [ngStyle]="{'font-size.px': fontSize}"
  constructor(private router: Router, public quizService: QuizService, public userService: UserService, private userPrefsService: UserPrefsService, private userAndQuizService: UserAndQuizService) {

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });

    this.userService.userSelected$.subscribe((user) => {
      this.userSelected = user;
    });

    this.quizService.quizSelected$.subscribe();

    this.userPrefsService.fontSize$.subscribe();
    this.fontSize = this.userPrefsService.getFontSize();

    this.userAndQuizService.oneUserQuizzes$.subscribe();
    this.currentUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();


  }

  ngOnInit(): void {

  }

  onDifficultyFiltrer(choice: Difficulty): void {

    this.difficultyFiltrer = choice;

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });

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


  // routerLink="/quiz-intro/{{idQuiz}}
  onSelectedQuiz(event: Quiz): void {
    this.quizService.setSelectedQuiz(+event.id);

    this.router.navigate(['/quiz-intro', event.id]);
  }


  deconnect(): void {
    this.router.navigate(["/login"]);
  }
}
