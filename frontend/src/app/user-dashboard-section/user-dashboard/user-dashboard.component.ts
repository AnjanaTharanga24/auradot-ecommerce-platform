import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import TokenService from '../../services/auth-service/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  imports: [RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  constructor(private tokenService: TokenService,
              private router: Router
  ){}

  logout(){
    this.tokenService.removeTokenFromCookie()
    this.router.navigate(['/signin'])
  }
}
