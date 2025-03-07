import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { Router } from '@angular/router';
import TokenService from '../../services/auth-service/token.service';
import { UserService } from '../../services/auth-service/user.service';

@Component({
  selector: 'app-delete-account',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent implements OnInit{
  accountDeleteForm!: FormGroup;
  formData: any = { status: false}

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private router: Router,
              private tokenService: TokenService,
              private userService: UserService
              ) {}

  ngOnInit(): void {
    const userDetails = this.tokenService.getDetailsFromToken()

    this.accountDeleteForm = this.fb.group({
      userName: [userDetails?.sub],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.accountDeleteForm.invalid) {
      return;
    }


    this.authService.signin(this.accountDeleteForm.value).then(
      response => {
        if(response.status == 200){
          this.userService.updateUser(this.formData).then(
            response => {
              if(response.status == 200){
                this.tokenService.removeTokenFromCookie()
                this.alertService.showSuccess("Successfully deleted your account.")
                setTimeout(() => {
                  this.router.navigate(['/signin'])
                }, 2000)
              }
              else{
                this.alertService.showError("Failed to delete account. Try again later.")
              }
            },
            error => {
              this.alertService.showError("An error occur. Try again later.")
            }
          )
          
        }
        else{
          this.alertService.showError("Incorrect password. Try again.")
        }
      },
      error => {
        this.alertService.showError("Authentication failed. Try again.")
      }
    )
  }

}
