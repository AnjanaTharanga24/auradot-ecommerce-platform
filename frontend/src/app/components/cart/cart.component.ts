import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { CustomerService } from '../../services/customer.service';
import { CartItemComponent } from "../../UIcomponents/cart-item/cart-item.component";
import { CartItem } from '../../common/cart-item';
import { Order } from '../../common/order';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatIconModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
decreaseQuantity($event: number) {
throw new Error('Method not implemented.');
}
removeFromCart(arg0: any) {
throw new Error('Method not implemented.');
}
  
  cartItems : CartItem[] = [];
  order!: any;
  totalAmount: number = 0;
  

  constructor(private http: HttpClient,
    private snackbar : MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private customerService: CustomerService,) 
    {}
  
    ngOnInit(): void {
     this.getCart();
    }

    getCart(): void {
      this.customerService.getCart()
        .then((res) => {
          this.order = res;
          this.cartItems = res.products || [];
          this.calculateTotalAmount();
        })
        .catch((error) => {
          console.log('Error fetching cart:', error);
        });
    }
    calculateTotalAmount(): void {
      this.totalAmount = this.cartItems.reduce((total, item) => total + item.price, 0);
    }
    
    increaseQuantity(id: any): void {
      this.customerService.increaseQuantity(id)
        .then(() => {
          this.snackbar.open('Increased', 'Close', { duration: 2000 });
          this.getCart();
        })
        .catch((error) => {
          console.log('Error adding product to cart:', error);
        });
    }
    removeItem(productId: number): void {
      this.customerService.removeFromCart(productId)
        .then(() => {
          this.snackbar.open('Removed from cart', 'Close', { duration: 2000 });
          this.getCart();
        })
        .catch((error) => {
          console.log('Error removing product from cart:', error);
        });
    }
    placeOrder(){
      this.dialog.open(PlaceOrderComponent);
    }
}