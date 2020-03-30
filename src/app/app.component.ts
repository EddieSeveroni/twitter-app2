import { Component } from '@angular/core';
// Adding the logout item in our MEAN stack user authentication app
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.doLogout()
  }

}