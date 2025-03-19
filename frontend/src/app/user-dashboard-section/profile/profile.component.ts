import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/auth-service/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertService } from '../../services/alert-service/alert.service';
import TokenService from '../../services/auth-service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit{
  user: any = {}
  isEditing = false
  originalUser: any = {}

  constructor(private userService: UserService,
              private alertService: AlertService,
              private tokenService: TokenService,
              private router: Router
  ){ }

  async ngOnInit() {  
      try{
        this.user = await this.userService.getUser()
        this.originalUser = {...this.user}
      } catch (error) {
        console.error('Failed to load user data:', error);
    }
  }

  editProfile() {
    this.isEditing = true;
  }

  async saveProfile() {
    try {
      let updatedFields: any = {};

      if (this.user.userName !== this.originalUser.userName) {
        updatedFields.userName = this.user.userName;
      }
      if (this.user.userEmail !== this.originalUser.userEmail) {
        updatedFields.userEmail = this.user.userEmail;
      }
      if (this.user.phoneNo !== this.originalUser.phoneNo) {
        updatedFields.phoneNo = this.user.phoneNo;
      }

      if (Object.keys(updatedFields).length === 0) {
        alert('No changes detected.');
        return;
      }

      await this.userService.updateUser(updatedFields)
      this.alertService.showSuccess("Successful updated.")
      this.isEditing = false;
      this.tokenService.removeTokenFromCookie
      this.router.navigate(['/signin'])

      } catch (error) {
        let errorMsg = String(error)
        this.alertService.showError(errorMsg)
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
