import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { CustomerService } from '../../services/customer.service';
import { ProductCardComponent } from "../../UIcomponents/product-card/product-card.component";
import { Product } from '../../common/product';

@Component({
  selector: 'app-product',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {


  products: Product[] = [];
  
  

  constructor(private http: HttpClient, private cartService: CartService, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.fetchInitialCartCount();
  }

  getAllProducts(): void {
    this.customerService.getAllProducts()
      .then((products) => {
        this.products = products;
      })
      .catch((error) => {
        console.log('Error fetching products:', error);
      });
  }
  
  addToCart(id: any): void {
    this.customerService.addToCart(id)
      .then((response) => {
        alert('Product added to cart: ' + response);
      })
      .catch((error) => {
        console.log('Error adding product:', error);
      });
  }
  
  fetchInitialCartCount(): void {
    this.customerService.getCartCount()
      .then((count) => {
        this.cartService.updateCartCount(count);
      })
      .catch((error) => {
        console.log('Error fetching count:', error);
      });
  }
}