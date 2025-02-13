import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { Order } from '../common/order';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.baseUrl;

  async getMyOrders(): Promise<Order[]> {
    const response = await axios.get(`${this.baseUrl}/carts/myOrders`);
    return response.data;
  }
  
  async getCart(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/carts/available`);
    return response.data;
  }

  async increaseQuantity(productId: Product): Promise<Product> {
    const response = await axios.post(`${this.baseUrl}/carts/addition`, { productId });
    return response.data;
  }

  async placeOrder(orderData: Order): Promise<Order> {
    const response = await axios.post(`${this.baseUrl}/carts/placeOrder`, orderData);
    return response.data;
  }

  async getAllProducts(): Promise<Product[]> {
    const response = await axios.get(`${this.baseUrl}/products`);
    return response.data;
  }

  async addToCart(productId: Product): Promise<Product> {
    const response = await axios.post(`${this.baseUrl}/carts`, { productId });
    return response.data;
  }

  async getCartCount(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/carts/count`);
    return response.data;
  }
}
