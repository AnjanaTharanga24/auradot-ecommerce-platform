import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  async getAllOrders(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/adminOrders`);
    return response.data;
  }
  
  async changeOrderStatus(orderId: number, status: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/adminOrders/${orderId}/${status}`);
  }
}
