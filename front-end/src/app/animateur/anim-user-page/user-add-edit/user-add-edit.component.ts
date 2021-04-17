import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";
import {DatePipe} from "@angular/common";
import {Handicap, HandicapToString} from "../../../../models/handicap.enum";
import {UserAndQuizService} from "../../../../services/user-and-quiz.service";
import {MadedQuizzesModel} from "../../../../models/user-and-quiz.model";
import { difficultyToText, Quiz} from "../../../../models/quiz.model";
import {QuizService} from "../../../../services/quiz.service";
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../../../../configs/server.config";

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  handicaps = Object.values(Handicap).filter(key => !isNaN(+key)).map(value => value as Handicap).map(value => {
    return {id: value, name: HandicapToString(value)}
  });
  newUser: boolean;
  user: User;
  quiz: Quiz[];
  birthday: string;
  handicap: string;
  modifyInput: number;
  configFontSizeSelected: number[];
  modifyFontSizeConfig: number;
  quizAnswers: QuizUserAnswer[];

  constructor(private path: ActivatedRoute, private users: UserService, private dateFormatter: DatePipe,
              private userAndQuiz: UserAndQuizService, private quizService: QuizService, private router: Router,
              private http: HttpClient) {  }

  ngOnInit(): void {
    let userId = +this.path.snapshot.paramMap.get('id-user');
    this.user = Object.assign({}, this.users.getUser(userId));
    this.newUser = !(this.user.name);
    this.birthday = this.dateFormatter.transform(this.user.birthday, "yyyy-MM-dd");
    this.handicap = HandicapToString(this.user.handicap);
    this.modifyInput = -1;
    this.configFontSizeSelected = [];
    this.modifyFontSizeConfig = -1;
    this.userAndQuiz.setOneUserQuizzes(this.user);
    this.quizService.quizzes$.subscribe(quizs => {
      this.getUserQuiz().forEach(answer => {
        const quiz = quizs.find(value => value.id == answer.id_quiz);
        this.quizAnswers.push({name: quiz.name, difficulty: difficultyToText(quiz.difficulty), result: this.getGoodAnswerCount(quiz, this.getUserQuiz())+"/"+quiz.questions.length,
          tries: this.getTriesCount(quiz, this.getUserQuiz()), mean: this.getAnswerCorrectMean(quiz, this.getUserQuiz())} as QuizUserAnswer);
      })
    });

    document.addEventListener("mousedown", ev => {
      if(this.modifyFontSizeConfig >= 0) {
        this.registerConfigFontSize();
      }
    });

  }

  setModifyInput(elmt: HTMLInputElement | HTMLTextAreaElement, id: number): void {
    this.modifyInput = id;
    setTimeout(() => {
      elmt.focus();
    }, 0);
  }

  setModifySelect(elmt: HTMLSelectElement, id: number): void {
    this.modifyInput = id;
    setTimeout(() => {
      elmt.focus();
    }, 0);
  }

  enter(event: KeyboardEvent): void {
    this.register(event.target);
  }

  escapeInput(elmt: HTMLInputElement | HTMLTextAreaElement): void {
    elmt.value = this.getUserValue();
    this.modifyInput = -1;
  }

  escapeSelect(elmt: HTMLSelectElement): void {
    elmt.value = this.getUserValue();
    this.modifyInput = -1;
  }

  onLostFocus(event: FocusEvent): void {
    this.register(event.target);
  }

  private register(target: EventTarget): void {
    switch (this.modifyInput) {
      case 0:
        // @ts-ignore
        this.user.surname = target.value;
        break;
      case 1:
        // @ts-ignore
        this.user.name = target.value;
        break;
      case 2:
        // @ts-ignore
        this.user.birthday = new Date(target.value/*, "yyyy-MM-dd"*/);
        break;
      case 3:
        // @ts-ignore
        this.user.handicap = parseInt(target.value);
        break;
      case 4:
        // @ts-ignore
        this.user.note = target.value;
        break;
    }
    this.modifyInput = -1;
    console.log(this.user);
  }

  getUserValue(): any {
    switch (this.modifyInput) {
      case 0:
        return this.user.surname;
      case 1:
        return this.user.name;
      case 2:
        return this.dateFormatter.transform(this.user.birthday, "yyyy-MM-dd");
      case 3:
        return HandicapToString(this.user.handicap);
      case 4:
        return this.user.note;
    }
  }

  onConfigFontSizeChange(id: number): void {
    if(!this.configFontSizeSelected.includes(id))
      this.configFontSizeSelected.push(id);
    else
      this.configFontSizeSelected = this.configFontSizeSelected.filter(value => value !== id);
  }

  deleteSelectedFontSizeConfig(): void {
    this.user.size_font_configs = this.user.size_font_configs
        .filter(value => !this.configFontSizeSelected.includes(value.id));
    this.configFontSizeSelected = [];
  }

  addFontSizeConfig(): void {
    this.user.size_font_configs.push({id: this.user.size_font_configs.length, name:"nom", default: false, size: 30});
  }

  setModifyFontSizeConfig(id: number) {
    this.modifyFontSizeConfig = id;
  }

  stopEvent(event: MouseEvent) {
    event.stopPropagation();
  }

  enterConfigFontSize() {
    this.registerConfigFontSize()
  }

  escapeConfigFontSize() {
    this.modifyFontSizeConfig = -1;
  }

  private registerConfigFontSize() {
    const title = (document.getElementById("title_config_"+this.modifyFontSizeConfig) as HTMLInputElement).value;
    const size = (document.getElementById("size_config_"+this.modifyFontSizeConfig) as HTMLInputElement).value;
    const defaultConfig = (document.getElementById("default_"+this.modifyFontSizeConfig) as HTMLInputElement).checked;
    const config = this.user.size_font_configs[this.modifyFontSizeConfig];
    config.name = title;
    config.size = parseInt(size);
    if(defaultConfig) {
      this.user.size_font_configs.forEach(value => value.default = false);
      config.default = true;
    }
    this.modifyFontSizeConfig = -1;
    console.log(this.user);
  }

  getUserQuiz(): MadedQuizzesModel[] {
    return this.userAndQuiz.getUserAndQuizs().find(value => value.id_user == this.user.id)?.played_quizzes || [];
  }

  saveUserModificationAndQuit() {
    if(this.userInfoCorrect()) {
      for (let i = 0; i < this.users.getUsers().length; i++) {
        if (this.users.getUsers()[i].id == this.user.id) {
          this.users.getUsers()[i] = this.user;
          console.log(this.user);
          break;
        }
      }
      if(this.newUser)
        this.http.post(serverUrl+"/user", this.user).subscribe(value => {
          console.log(value);
        });
      else
        this.http.put(serverUrl+"/user/"+this.user.id, this.user).subscribe(value => {
          console.log(value);
        });
      this.router.navigate(["/animateur"]);
    }
  }

  quit() {
    if(this.newUser)
      this.users.deleteUser(this.user);
  }

  userInfoCorrect(): boolean {
    return !!(this.user.birthday && this.user.surname && this.user.name);
  }

  getGoodAnswerCount(quiz: Quiz, answers: MadedQuizzesModel[]): number {
    const quizAnswers = answers.filter(value => value.id_quiz == quiz.id);
    return quizAnswers[quizAnswers.length - 1].user_answers.filter(value => {
      return quiz.questions.find(question => question.id == value.id_question)
          .answer.find(answer => answer.id_answer == value.response_user).is_correct
    }).length;
  }

  getTriesCount(quiz: Quiz, maddedQuiz: MadedQuizzesModel[]): number {
    return maddedQuiz.filter(value => value.id_quiz == quiz.id).length;
  }

  getAnswerCorrectMean(quiz: Quiz, answers: MadedQuizzesModel[]): number {
    const quizAnswers = answers.filter(value => value.id_quiz == quiz.id);
    let mean = 0;
    quizAnswers.forEach(answer => {
      mean += answer.user_answers.filter(value => {
        return quiz.questions.find(question => question.id == value.id_question)
            .answer.find(answer => answer.id_answer == value.response_user).is_correct
      }).length;
    })
    return mean/quizAnswers.length;
  }

  imageUrlChange(img_url: HTMLInputElement) {
    this.user.image_url = img_url.value;
  }

}

interface QuizUserAnswer {
  name: string,
  difficulty: string,
  result: string,
  tries: number,
  mean: number
}
