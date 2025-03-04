import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,
               private authService: AuthService,
               private alertService: AlertService,
               private router: Router

              ){}

  ngOnInit(): void {
      this.signupForm = this.fb.group({
        user_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
        user_email: ['', [Validators.required, Validators.email]],
        phone_no: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
        confirmPassword: ['', Validators.required]
      })
  }

  onSubmit(): void{
    if(this.signupForm.value.password !== this.signupForm.value.confirmPassword){
      this.signupForm.controls['confirmPassword'].setErrors({mismatch: true})
      return;
    }

    if(this.signupForm.invalid){
      this.signupForm.markAsTouched;
      return;
    }

    console.log('Signup successful', this.signupForm.value);

    this.authService.signup(this.signupForm.value).then(
      response => {
        if(response.status == 201){
          this.alertService.showSuccess("Registration successful! Please log in.")
          this.router.navigate(['/signin'])
        }
        else{
          this.alertService.showError(response.data);
          this.router.navigate(['/signup'])
        }
      },
      error => {
        this.alertService.showError(error);
        this.router.navigate(['/signup'])
      }
    )
  }
}
