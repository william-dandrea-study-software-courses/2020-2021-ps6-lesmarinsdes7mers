import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';

import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { UserComponent } from './users/user/user.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { HomePageComponent } from './homePage/home-page/home-page.component';
import {AppRoutingModule} from './app.routing.module';
import { DifficultyBarComponent } from './homePage/difficulty-bar/difficulty-bar.component';
import { QuestionPresenterBarComponent } from './homePage/question-presenter-bar/question-presenter-bar.component';
import GuestConfigPageComponent from './users/guest/guest-config/guest-config-page/guest-config-page.component';
import GuestConfigFontsizeComponent from './users/guest/guest-config/guest-config-fontsize/guest-config-fontsize.component'
import GuestConfigHandicapComponent from './users/guest/guest-config/guest-config-handicap/guest-config-handicap.component'
import { PlayQuizComponent } from './quizzes/play-quiz/play-quiz.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    UserComponent,
    UserFormComponent,
    UserListComponent,
    HomePageComponent,
    DifficultyBarComponent,
    QuestionPresenterBarComponent,

    GuestConfigPageComponent,
    GuestConfigFontsizeComponent,
    GuestConfigHandicapComponent,

    PlayQuizComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
