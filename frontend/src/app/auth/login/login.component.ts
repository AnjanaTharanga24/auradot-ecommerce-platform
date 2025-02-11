import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSubmitted: boolean = false;

  constructor(private router: Router) {}

  login(form: NgForm) {
    console.log(form.value);

    this.isSubmitted = true;

    if (form.valid) {
      console.log('Forms is submitted');
    } else {
      console.log('Forms is not submitted');
    }
  }

  goToSignUp() {
    this.router.navigate(['register']);
  }

  forgotPassword() {
    console.log('forgot password');
  }
}
