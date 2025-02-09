import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../services/customer.service';
import { OrderCardComponent } from "../../UIcomponents/order-card/order-card.component";

@Component({
  selector: 'app-my-orders',
  imports: [MatTableModule, MatCard, MatCardContent, CommonModule, OrderCardComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  
  myOrders: any[] = [];
  
  constructor(private http: HttpClient, private customerService: CustomerService) {}

  ngOnInit(): void {
   this.getMyOrders();
  }

  async getMyOrders(): Promise<void> {
    try {
      this.myOrders = await this.customerService.getMyOrders();
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  getOrderProgress(status: string): string {
    switch (status) {
      case 'placed': return '33%';
      case 'shipped': return '66%';
      case 'delivered': return '100%';
      default: return '0%';
    }
  }
}