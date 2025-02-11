import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isSubmitted: boolean = false;
  isPasswordMatched: boolean = true;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.isSubmitted = true;
    console.log(form.value);
    if (form.value.password != form.value.confirmPassword) {
      this.isPasswordMatched = false;
    }

    if (form.valid && this.isPasswordMatched) {
      this.authService.register();
    } else {
      console.log('Registration is unsuccessfull');
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
