import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/adminOrders`);
  }

  
  changeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/adminOrders/${orderId}/${status}`);
  }
}
