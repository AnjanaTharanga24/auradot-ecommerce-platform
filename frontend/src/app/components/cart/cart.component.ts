import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaceOrderComponent } from '../place-order/place-order.component';


@Component({
  selector: 'app-cart',
  imports: [ CommonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
removeFromCart(arg0: any) {
throw new Error('Method not implemented.');
}

  
  cartItems : any[] = [];
  order: any;
  

  constructor(private http: HttpClient,
    private snackbar : MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog) 
    {}
  
    ngOnInit(): void {
     this.getCart();
    }

    getCart() {
      this.http.get<any>('http://localhost:8080/api/carts/available').subscribe(
        (res) => {
          this.order = res;
          this.cartItems = res.cartItems || []; 
        },
        (error) => {
          console.error('Error fetching cart:', error);
        }
      );
    }
    increaseQuantity(id: any) {
      this.http.post('http://localhost:8080/api/carts/addition', { productId: id }).subscribe(
        response => {
          this.snackbar.open('Product Quantity Increased', 'Close', { duration: 2000 });
          this.getCart();
        },
        (error) => {
          console.error('Error adding product to cart:', error);
          
        }
      );
    }
    placeOrder(){
      this.dialog.open(PlaceOrderComponent);
    }
}
