import { Component, OnInit } from '@angular/core';
import {CreateQuizzService} from "../../../../../services/admin/create-quizz.service";
import {QuizCreationModel, Visibility} from "../../../../../models/quiz-creation.model";
import {Question, QuestionType} from "../../../../../models/question.model";
import {Difficulty} from "../../../../../models/quiz.model";

@Component({
  selector: 'app-anim-create-quizz-homepage',
  templateUrl: './anim-create-quizz-homepage.component.html',
  styleUrls: ['./anim-create-quizz-homepage.component.scss']
})
export class AnimCreateQuizzHomepageComponent implements OnInit {


  private nameQuiz: string;
  private difficultyQuiz: Difficulty;
  private visibilityQuiz: Visibility;
  private questionsQuiz: Question[] = new Array();
  private quiz: QuizCreationModel;


  constructor(private createQuizService: CreateQuizzService) {}



  /**
   * Cette méthode va push le quiz sur le service
   */
  addQuiz(canAdd: boolean): void {
    if (canAdd === true) {
      this.quiz.difficulty = this.difficultyQuiz;
      this.quiz.name = this.nameQuiz;
      this.quiz.visibility = this.visibilityQuiz;
      this.quiz.questions = this.questionsQuiz;

      this.createQuizService.addQuiz(this.quiz);
      console.log('AnimCreateQuizzHomepageComponent : addQuiz()');
    }
  }

  deleteQuiz(canDelete: boolean): void {
    if (canDelete === true) {
      this.createQuizService.deleteQuiz();
      console.log('AnimCreateQuizzHomepageComponent : onDeleteQuiz()');
    }
  }

  ngOnInit(): void {}

}
