import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor() { }

  async getAllItems() {
    try {
      const response = await axios.get(`${this.apiUrl}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }
}
