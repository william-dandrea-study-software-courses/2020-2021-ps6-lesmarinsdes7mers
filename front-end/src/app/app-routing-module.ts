import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import {HomePageComponent} from './homePage/home-page/home-page.component';
import {QuizIntroComponent} from "./quizzes/quiz-intro/quiz-intro.component";
import {QuizResultComponent} from "./quizzes/quiz-result/quiz-result.component";
import {QuizCorrectionComponent} from "./quizzes/quiz-correction/quiz-correction.component";
import GuestConfigFontsizeComponent from './users/guest/guest-config/guest-config-fontsize/guest-config-fontsize.component';
import GuestConfigHandicapComponent from './users/guest/guest-config/guest-config-handicap/guest-config-handicap.component';
import LoginPageComponent from './users/login-page/login-page.component';
import { PlayQuizComponent } from './quizzes/play-quiz/play-quiz.component';
import {QuizCorrectionAnswerComponent} from "./quizzes/quiz-correction/quiz-correction-answer/quiz-correction-answer.component";
import {AnimQuizzHomepageComponent} from "./animateur/anim-quizz-page/anim-quizz-homepage/anim-quizz-homepage.component";
import {AnimUserHomepageComponent} from "./animateur/anim-user-page/anim-user-homepage/anim-user-homepage.component";
import {AnimSettingsHomepageComponent} from "./animateur/anim-settings/anim-settings-homepage/anim-settings-homepage.component";
import {AnimCreateQuizzHomepageComponent} from "./animateur/anim-quizz-page/anim-create-quizz/anim-create-quizz-homepage/anim-create-quizz-homepage.component";
import { AnimMainpageComponent } from './animateur/anim-mainpage/anim-mainpage.component';
import {UserAddEditComponent} from "./animateur/anim-user-page/user-add-edit/user-add-edit.component";

const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'guest/config/fontsize', component: GuestConfigFontsizeComponent},
    {path: 'guest/config/handicap', component: GuestConfigHandicapComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'homepage', component: HomePageComponent},
    {path: 'homepage/:idUser', component: HomePageComponent},
    {path: 'quiz-intro/:id', component: QuizIntroComponent},
    {path: 'quiz-result', component: QuizResultComponent},
    {path: 'quiz-correction', component: QuizCorrectionComponent},
    {path: 'quiz-correction-answer/:id-question', component: QuizCorrectionAnswerComponent},
    {path: 'play-quiz/:id-quiz', component: PlayQuizComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'animateur/quizz-home-page', component: AnimQuizzHomepageComponent},
    {path: 'animateur/user-home-page', component: AnimUserHomepageComponent},
    {path: 'animateur/settings-home-page', component: AnimSettingsHomepageComponent},
    {path: 'animateur/quizz-home-page/create-quizz', component: AnimCreateQuizzHomepageComponent},
    {path: 'animateur/user-add-edit/:id-user', component: UserAddEditComponent},
    {path: 'animateur', component:AnimMainpageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
