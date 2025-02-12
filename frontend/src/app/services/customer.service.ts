import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.baseUrl;

  async getMyOrders(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/carts/myOrders`);
    return response.data;
  }
  
  async getCart(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/carts/available`);
    return response.data;
  }

  async increaseQuantity(productId: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/carts/addition`, { productId });
    return response.data;
  }

  async placeOrder(orderData: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/carts/placeOrder`, orderData);
    return response.data;
  }

  async getAllProducts(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/products`);
    return response.data;
  }

  async addToCart(productId: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/carts`, { productId });
    return response.data;
  }

  async getCartCount(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/carts/count`);
    return response.data;
  }
}
