import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manage-order',
  imports: [MatCard, MatCardContent, MatTableModule, MatMenu, MatMenuTrigger],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent implements OnInit {

  orders: any[] = [];
  
  

  constructor(
    private http: HttpClient,
  private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.http.get<any[]>('http://localhost:8080/api/orders/adminOrders').subscribe(
      (data) => {
        this.orders = data;
        console.log('Orders:', this.orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  changeOrderStatus(orderId: number, status: string) {
    this.http.get(`http://localhost:8080/api/orders/adminOrders/${orderId}/${status}`).subscribe(
      response => {
        alert('change success status: ' + response);
      },
      (error) => {
        console.error('Error updating status:', error);
        alert(`Error: ${error.message || 'Unknown error'}`);
      }
    );
  }
}
