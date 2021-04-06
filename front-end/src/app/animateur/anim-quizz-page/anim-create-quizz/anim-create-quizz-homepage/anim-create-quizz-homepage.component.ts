import {Component, OnInit} from '@angular/core';
import {CreateQuizzService} from "../../../../../services/admin/create-quizz.service";
import {QuizCreationModel, Visibility} from "../../../../../models/quiz-creation.model";
import {Answer, Question, QuestionType} from "../../../../../models/question.model";
import {Difficulty} from "../../../../../models/quiz.model";

@Component({
  selector: 'app-anim-create-quizz-homepage',
  templateUrl: './anim-create-quizz-homepage.component.html',
  styleUrls: ['./anim-create-quizz-homepage.component.scss']
})
export class AnimCreateQuizzHomepageComponent implements OnInit {


  public nameQuiz: string;
  public difficultyQuiz: Difficulty;
  public visibilityQuiz: Visibility;
  public questionsQuiz: Question[] = new Array();
  public quiz: QuizCreationModel;

  public numberOfQuestions: number;


  constructor(private createQuizService: CreateQuizzService) {
    this.numberOfQuestions = 1;
    this.questionsQuiz.push({question_name: '', type: QuestionType.TEXT, id: String(this.numberOfQuestions), answers: []});
  }

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



  onDifficultyQuiz(event: Difficulty): void {
    console.log('HOMEPAGE : DIFFICULTY : ' + event);
    this.difficultyQuiz = event;
  }

  onThemeQuiz(event: string): void {
    console.log('HOMEPAGE : CHANGENAME : ' + event);
    this.nameQuiz = event;
  }

  onVisibilityQuiz(event: Visibility): void {
    console.log('HOMEPAGE : VISIBILITY : ' + event);
    this.visibilityQuiz = event;
  }

  onDeleteQuestion(event: number): void {
    const tmp = this.questionsQuiz.find(question => question.id === String(event));
    this.questionsQuiz = this.questionsQuiz.filter(obj => obj !== tmp);
  }

  onAddAnQuestion(): void {
    this.numberOfQuestions++;
    this.questionsQuiz.push({question_name: '', type: QuestionType.TEXT, id: String(this.numberOfQuestions), answers: []});
  }

  onUpQuestion(event: number): void {
    console.log('HOMEPAGE : UP QUESTION : ' + event);
  }

  onDownQuestion(event: number): void {
    console.log('HOMEPAGE : DOWN QUESTION : ' + event);
  }

  onEditListAnswer(event: Answer[], question: Question): void {
    question.answers = event;
    console.log('HOMEPAGE : UPDATE ANSWERS FOR QUESTION : ' + question.answers);
  }


}
