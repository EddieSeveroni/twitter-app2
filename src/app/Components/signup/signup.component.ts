import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
user:User;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
   }

  ngOnInit() {}

  registerUser() {
    alert('first alert')
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      alert('second alert')
      console.log('sign-up')
      if (res.result) {
        console.log('Entered if');
        console.log(res);
        this.signupForm.reset()
        this.router.navigate(['/log-in']);
      }
    })
  }
}
