import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UserProfileComponent } from './Components/user-profile-page/user-profile-page.component';

import { AuthGuard } from "./shared/Guards/auth.guard";


const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }