import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { Item } from '../../common/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = environment.baseUrl;

  constructor() {}

  async getAllItems() {
    try {
      const response = await axios.get(`${this.baseUrl}/items`);
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
      const response = await axios.post(
        `${this.baseUrl}/buyer/items`,
        cartRequest
      );
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  sellerAddItems(item: Item) {
    return axios
      .post(`${this.baseUrl}/items`, item)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error adding item:', error);
        throw error;
      });
  }

  getAllCategories() {
    return axios
      .get(`${this.baseUrl}/items/categories`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('Error fetching item categories');
        throw error;
      });
  }

  getItemById(id: number) {
    return axios.get(`${this.baseUrl}/buyer/items/${id}`).then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching item by ID:', error);
      throw error;
    })
  }

}
