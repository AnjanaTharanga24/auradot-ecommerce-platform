import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:8080/api';
  constructor() { }

  async getAllItems() {
    try {
      const response = await axios.get(`${this.apiUrl}/items`);
      return response.data.map((item: any) => ({
        ...item,
        quantity: 0, 
      }));
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }

  async addToCart(item: any) {
    const cartRequest = {
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
    };

    try {
      const response = await axios.post(`${this.apiUrl}/buyer/items`, cartRequest);
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  async sellerAddItems(){
    const item = {
      name: '',
      description: '',
      price : 0
    };
    try {
      const response = await axios.post(`${this.apiUrl}/items/${item}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}
