import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { mockOrder } from '../../data/orders';
import axios from 'axios';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
onNavigate() {
throw new Error('Method not implemented.');
}
  order = { ...mockOrder };
  newOrder: {
    customerName: string;
    address: string;
    totalPrice: number;
    items: { id: number; name: string; status: string; imageUrl: string }[];
  } = {
    customerName: '',
    address: '',
    totalPrice: 0,
    items: []
  };

  constructor() {}


  removeItem(index: number) {
    this.newOrder.items.splice(index, 1);  
  }

  submitOrder() {
    
  }

  
}