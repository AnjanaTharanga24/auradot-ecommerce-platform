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

  getAllProducts(): void {
    this.customerService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('fetching products error:', error);
      }
    );
  }
  addToCart(id: any) {
    this.customerService.addToCart(id).subscribe(
      response => {
        alert('Product added to cart: ' + response);
      },
      (error) => {
        console.log('Error adding product:', error);
      }
    );
  }
  fetchInitialCartCount(): void {
    this.customerService.getCartCount().subscribe(
      (count) => {
        this.cartService.updateCartCount(count);
      },
      (error) => {
        console.log('error fetching count:', error);
      }
    );
  }
}