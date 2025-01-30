import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {


  products: any[] = [];
  
  

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.fetchInitialCartCount();
  }

  getAllProducts(): void {
    this.http.get<any[]>('http://localhost:8080/api/products').subscribe(
      (data) => {
        this.products = data;
        console.log('Products:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  addToCart(id: any) {
    this.http.post('http://localhost:8080/api/carts', { productId: id }).subscribe(
      response => {
        alert('Product added to cart: ' + response);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        alert(`Error: ${error.message || 'Unknown error'}`);
      }
    );
  }
  fetchInitialCartCount(): void {
    this.http.get<number>('http://localhost:8080/api/carts/count').subscribe(
      (count) => {
        this.cartService.updateCartCount(count); 
      },
      (error) => {
        console.error('Error fetching cart count:', error);
      }
    );
  }
}