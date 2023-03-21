import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/user/homepage/homepage.component';
import { AuthGuardService } from './services/AuthGuard/auth-guard.service';

const routes: Routes = [
  { path: '', loadComponent: () => import('./components/user/homepage/homepage.component').then(h => h.HomepageComponent) },
  // {path:'', component:HomepageComponent},
  { path: 'login', loadComponent: () => import('./components/user/login/login.component').then(l => l.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/user/register/register.component').then(r => r.RegisterComponent) },
  { path: 'viewquestion', loadComponent: () => import('./components/user/single-question/single-question.component').then(s => s.SingleQuestionComponent) },
  { path: 'askquestion', canActivate:[AuthGuardService], loadComponent: () => import('./components/user/ask-question/ask-question.component').then(a => a.AskQuestionComponent) },
  { path: 'profile', canActivate:[AuthGuardService], loadComponent: () => import('./components/user/user-profile/user-profile.component').then(u => u.UserProfileComponent) },
  {
    path: 'admin', loadComponent: () => import('./components/admin/user-details/user-details.component').then(u => u.UserDetailsComponent),
    children: [
      { path: 'questions', loadComponent: () => import('./components/admin/question-details/question-details.component').then(q => q.QuestionDetailsComponent) },

    ]
  },
  { path: 'allQuestions', loadComponent: () => import('./components/user/question-list/question-list.component').then(l => l.QuestionListComponent) },

  { path: '**', loadComponent: () => import('./components/page-not-found/page-not-found.component').then(p => p.PageNotFoundComponent) },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
