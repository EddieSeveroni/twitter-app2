import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UserProfileComponent } from './Components/user-profile-page/user-profile-page.component';

/** To handle REST APIs via HTTP requests in the Angular user authentication app. 
 * I need to import Angular HttpClient service in the auth module. */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
// Implement Angular 9 Reactive Forms
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
