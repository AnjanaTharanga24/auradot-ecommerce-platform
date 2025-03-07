import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { Router } from '@angular/router';
import TokenService from '../../services/auth-service/token.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  signinForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private router: Router,
              private tokenService: TokenService
              ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
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
