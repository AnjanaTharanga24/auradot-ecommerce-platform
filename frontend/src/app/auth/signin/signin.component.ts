import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { Router } from '@angular/router';
import TokenService from '../../services/auth-service/token.service';
import { InputFieldComponent } from '../input-field/input-field.component';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, InputFieldComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  signinForm!: FormGroup;

  userNameControl!:FormControl
  passwordControl!: FormControl

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private router: Router,
              private tokenService: TokenService
              ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.userNameControl = this.signinForm.get('userName') as FormControl
    this.passwordControl = this.signinForm.get('password') as FormControl
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      this.signinForm.markAsTouched
      return;
    }
    this.authService.signin(this.signinForm.value).then(
      response => {
        if(response.status == 200){
          this.alertService.showSuccess("Login Successful.")
          this.tokenService.storeTokenToCookie(response.data.accessToken)
          this.router.navigate(['/home'])
        }
        else{
          this.alertService.showError(response.data)
          this.router.navigate(['/signin'])
        }
      },
      error => {
        this.alertService.showError(error)
        this.router.navigate(['/signin'])
      }
    )
  }

}
