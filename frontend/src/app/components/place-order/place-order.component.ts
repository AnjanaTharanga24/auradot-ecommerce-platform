import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-place-order',
  imports: [MatCardModule,MatFormFieldModule,ReactiveFormsModule, CommonModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent implements OnInit {
closeForm() {
throw new Error('Method not implemented.');
}
  orderForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private customerService: CustomerService
  ){}
  ngOnInit() {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null],
    });
  }
  async placeOrder() {
    if (this.orderForm.valid) {
      const address = this.orderForm.get('address')?.value;
      try {
        const response = await this.customerService.placeOrder(address);
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 3000 });
        this.dialog.closeAll(); 
      } catch (error) {
        console.error('Error placing order:', error);
        const errorMessage = (error as any).message || 'Failed to place order';
        this.snackBar.open(`Error: ${errorMessage}`, 'Close', {
          duration: 3000
        });
      }
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
    }
  }
}