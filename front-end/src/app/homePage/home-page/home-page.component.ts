import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import UserPrefsService from "../../../services/userprefs.service";
import {Difficulty, Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";

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

  constructor( public quizService: QuizService, public userService: UserService, private route: ActivatedRoute) {

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });

    this.userService.userSelected$.subscribe((user) => {
      this.userSelected = user;
    });

    /*
    this.route.params.subscribe(params => {
      this.idUser = +params['idUser'];
      console.log(this.idUser);
    });
     */

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

}
