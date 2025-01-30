import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  imports: [MatTableModule, MatCard, MatCardContent, CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
myOrders: any[] = [];
  
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   this.myOrdersGet();
  }


  
  myOrdersGet() {
    this.http.get('http://localhost:8080/api/carts/myOrders').subscribe(
      (data) => {
       this.myOrders = data as any[];
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  getOrderProgress(status: string) {
    switch (status) {
        case 'placed': return '33%';
        case 'shipped': return '66%';
        case 'delivered': return '100%';
        default: return '0%';
    }
}
}
