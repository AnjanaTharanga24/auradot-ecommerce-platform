import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DemoAngularMaterailModule } from './DemoAngularMaterialModule';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, FormsModule, CommonModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  cartCount: number = 0;

  constructor(private customerService: CustomerService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchCartCount();
  }

  async fetchCartCount(): Promise<void> {
    try {
      this.cartCount = await this.customerService.getCartCount();
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  }
  title = 'frontend';
}