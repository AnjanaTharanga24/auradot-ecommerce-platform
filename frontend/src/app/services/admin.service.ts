import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = environment.baseUrl;
 
  constructor(private http: HttpClient) { }

  async getAllOrders(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/orders/adminOrders`);
    return response.data;
  }
  
  async changeOrderStatus(orderId: number, status: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/orders/adminOrders/${orderId}/${status}`);
  }
}
