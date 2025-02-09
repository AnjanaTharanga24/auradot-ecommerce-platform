import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { CustomerService } from '../../services/customer.service';
import { ProductCardComponent } from "../../UIcomponents/product-card/product-card.component";

@Component({
  selector: 'app-product',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {


  products: any[] = [];
  
  

  constructor(private http: HttpClient, private cartService: CartService, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.fetchInitialCartCount();
  }

  async getAllProducts(): Promise<void> {
    try {
      this.products = await this.customerService.getAllProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async addToCart(id: any): Promise<void> {
    try {
      const response = await this.customerService.addToCart(id);
      alert('Product added to cart: ' + response);
    } catch (error) {
      console.log('Error adding product:', error);
    }
  }

  async fetchInitialCartCount(): Promise<void> {
    try {
      const count = await this.customerService.getCartCount();
      this.cartService.updateCartCount(count);
    } catch (error) {
      console.log('Error fetching count:', error);
    }
  }
}