import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UserProfilePageComponent } from './Components/user-profile-page/user-profile-page.component';

import { paths } from './app-paths';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { PathResolveService } from './path-resolve.service';

import { AuthGuard } from './shared/Guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full'},
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:id', component: UserProfilePageComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: paths.home, pathMatch: 'full' },
  { path: paths.home, component: HomeComponent },
  { path: paths.about, component: AboutComponent },
  { path: paths.contact, component: ContactComponent },
  
  { path: '**', resolve: {
      path: PathResolveService
    },
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
