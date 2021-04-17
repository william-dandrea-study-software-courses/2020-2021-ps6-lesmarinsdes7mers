import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  user: User;
  quiz: Quiz[];
  birthday: string;

  constructor(private path: ActivatedRoute, private users: UserService, private dateFormatter: DatePipe,
              private userAndQuiz: UserAndQuizService, private quizService: QuizService, private router: Router,
              private http: HttpClient) {  }

  ngOnInit(): void {
    let userId = +this.path.snapshot.paramMap.get('id-user');
    this.user = this.users.getUser(userId);
    this.birthday = this.dateFormatter.transform(this.user.birthday, "dd/MM/yyyy");
  }

  getUserQuiz(): MadedQuizzesModel[] {
    return this.userAndQuiz.getUserAndQuizs().find(value => value.id_user == this.user.id)?.maded_quizzes || [];
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
        return quiz.questions.find(question => question.id == value.id_question.toString())
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
        return quiz.questions.find(question => question.id == value.id_question.toString())
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
