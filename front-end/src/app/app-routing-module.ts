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

const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'guest/config/fontsize', component: GuestConfigFontsizeComponent},
    {path: 'guest/config/handicap', component: GuestConfigHandicapComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'homepage', component: HomePageComponent},
    {path: 'quiz-intro/:id', component: QuizIntroComponent},
    {path: 'quiz-result', component: QuizResultComponent},
    {path: 'quiz-correction', component: QuizCorrectionComponent},
    {path: 'play-quiz/:id-quiz', component: PlayQuizComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
