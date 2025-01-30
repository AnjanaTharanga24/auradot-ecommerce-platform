import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { mockOrder } from '../../data/orders';
import axios from 'axios';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
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

  updateOrderField(field: string, value: any) {
    (this.newOrder as any)[field] = value;
  }

  addItem() {
    this.newOrder.items.push({
      id: 0,  
      name: '',
      status: 'ordered',
      imageUrl: ''  
    });
  }

  removeItem(index: number) {
    this.newOrder.items.splice(index, 1);  
  }

  async submitOrder() {
    try {
      const response = await axios.post('http://localhost:8080/api/orders', this.newOrder);
      console.log('Order submitted successfully', response.data);
      this.resetForm();
    } catch (error) {
      console.error('Error :', error);
    }
  }

  resetForm() {
    this.newOrder = {
      customerName: '',
      address: '',
      totalPrice: 0,
      items: []
    };
  }
}