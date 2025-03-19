import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { Router } from '@angular/router';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, InputFieldComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  userNameControl!:FormControl
  userEmailControl!:FormControl
  phoneNoControl!:FormControl
  passwordControl!: FormControl
  confirmPasswordControl!: FormControl;
  
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

      this.userNameControl = this.signupForm.get('user_name') as FormControl
      this.userEmailControl = this.signupForm.get('user_email') as FormControl
      this.phoneNoControl = this.signupForm.get('phone_no') as FormControl
      this.passwordControl = this.signupForm.get('password') as FormControl
      this.confirmPasswordControl = this.signupForm.get('confirmPassword') as FormControl;

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
