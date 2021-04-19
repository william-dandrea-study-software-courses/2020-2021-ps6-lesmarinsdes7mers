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
  public idCl: number;

  public publicSession: boolean;

  public userSelected: User;

  public currentUserAndQuiz: UserAndQuizModel;

  constructor(private router: Router, private route: ActivatedRoute, public quizService: QuizService, public userService: UserService, private userPrefsService: UserPrefsService, private userAndQuizService: UserAndQuizService) {

    this.userService.publicSession$.subscribe((elem) => this.publicSession = elem);
    this.publicSession = this.userService.getPublicSession();


    const id = parseInt(this.route.snapshot.paramMap.get('idUser'), 10);
    this.idCl = id;
    if (id && !this.publicSession) {
      this.userService.setSelectedUser(this.userService.getUsers()[this.userService.getUsers().findIndex(el => el.id === id)]);
    }

    this.userService.userSelected$.subscribe((user) => {
      this.userSelected = user;
    });

    this.quizService.quizSelected$.subscribe();

    this.userPrefsService.fontSize$.subscribe((elem) => {this.fontSize = elem;});
    this.fontSize = this.userPrefsService.getFontSize();

    this.userAndQuizService.oneUserQuizzes$.subscribe((elem) => {this.currentUserAndQuiz = elem;});
    this.currentUserAndQuiz = this.userAndQuizService.getOneUserQuizzes();

    console.log(this.quizList);

  }

  ngOnInit(): void {

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });

    if (this.publicSession) {
      this.quizList = this.quizService.getPublicQuizzes();
      // Verification
      this.quizList = this.quizList.filter(el => el.privacy.is_public === true);
    } else {
      this.quizList = this.quizService.getQuizForOneUser(this.idCl);
    }

    console.log(this.quizList);
    console.log(this.publicSession);


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


  isPlayedQuiz(quiz: Quiz): boolean {

    if (this.publicSession) {
      return false;
    }

    return this.currentUserAndQuiz.played_quizzes.map(plQz => plQz.id_quiz).includes(quiz.id);

  }

  getNumberOfGoodQuestion(quiz: Quiz): number {

    if (this.userSelected) {
      const index = this.currentUserAndQuiz.played_quizzes.findIndex(elem => elem.id_quiz === quiz.id);
      if (index >= 0) {
        return this.currentUserAndQuiz.played_quizzes[index].score_user;
      }
    }
    return 0;

  }

  // routerLink="/quiz-intro/{{idQuiz}}
  onSelectedQuiz(event: Quiz): void {
    this.quizService.setSelectedQuiz(+event.id);

    this.router.navigate(['/quiz-intro', event.id]);
  }


  deconnect(): void {
    this.userService.userSelected$.next(undefined);
    this.userAndQuizService.userAndQuizs$.next(undefined);
    this.userAndQuizService.oneUserQuizzes$.next(undefined);
    this.router.navigate(["/login"]);
  }
}
