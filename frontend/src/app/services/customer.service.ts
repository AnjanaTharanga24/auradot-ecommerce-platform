import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/carts/myOrders`);
  }

  getCart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/carts/available`);
  }

  increaseQuantity(productId: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/carts/addition`, { productId });
  }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/carts/placeOrder`, orderData);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  addToCart(productId: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/carts`, { productId });
  }

  getCartCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/carts/count`);
  }
}
