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
    const response = await axios.get(`${this.baseUrl}/orders`);
    console.log(response);
    return response.data;
    console.log(response.data);
    
  }
  
  async getCart(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/carts/${1}`);
    return response.data;
  }

  async increaseQuantity(productId: Product): Promise<Product> {
    const response = await axios.post(`${this.baseUrl}/carts/addition`, { productId });
    return response.data;
  }

  async placeOrder(address: string): Promise<Order> {
    const orderData = {
      cartId: 1,
      address: address
    };
    const response = await axios.post(`${this.baseUrl}/carts/placeOrder`, orderData);
    return response.data;
  }

  async getAllProducts(): Promise<Product[]> {
    const response = await axios.get(`${this.baseUrl}/products`);
    return response.data;
  }

  async addToCart(productId: Product): Promise<Product> {
    const payload = {
      productId: productId,
      cartId: 1,
    };
    const response = await axios.post(`${this.baseUrl}/carts/addProduct`, payload);
    this.getCartCount();
    return response.data;
  }
  async removeFromCart(productId: number): Promise<void> {
    const cartId=1;
    await axios.delete(`${this.baseUrl}/carts/${cartId}/removeProduct/${productId}`);
    this.getCartCount();
  }

  async getCartCount(): Promise<any> {
    const cartId=1;
    const response = await axios.get(`${this.baseUrl}/carts/${cartId}/productCount`);
    return response.data;
  }
}
