import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {
  private baseUrl = environment.baseUrl;

  constructor() { }

  async getAllItems() {
    try {
      const response = await axios.get(`${this.baseUrl}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }

  itemDeleteById(id: number) {
    return axios.delete(`${this.baseUrl}/items/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error deleting item:', error);
        throw error;
      });
  }
  
}
