import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DemoAngularMaterailModule } from './DemoAngularMaterialModule';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SellerComponent } from "./seller/seller.component";
import { AuthService } from './services/auth-service/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, FormsModule, CommonModule, MatToolbarModule, SellerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  cartCount: number = 0;
  showNavbar: boolean = true

  constructor(private cartService: CartService,
              private router: Router,
              private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count; 
    });

    this.authService.authStatus$.subscribe((isAuthenticate) => {
      this.showNavbar = isAuthenticate
    })

    this.router.events.subscribe(() => {
      const currentRoute = this.router.url
      this.showNavbar = !(currentRoute === '/signup' || currentRoute === '/signin')
    })
  }
}