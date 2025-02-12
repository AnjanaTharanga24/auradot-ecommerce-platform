import { Injectable } from '@angular/core';
import axios from 'axios';
import { Item } from '../common/item';

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

  sellerAddItems(item: Item) {
    return axios.post(`${this.apiUrl}/items`, item)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error adding item:', error);
        throw error;
      });
  }
  
}
