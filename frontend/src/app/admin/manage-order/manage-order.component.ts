import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-order',
  imports: [MatCard, MatCardContent, MatTableModule, MatMenu, MatMenuTrigger],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent implements OnInit {

  orders: any[] = [];

  constructor(
    private http: HttpClient,
  private snackBar: MatSnackBar,
  private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  async getAllOrders(): Promise<void> {
    try {
      this.orders = await this.adminService.getAllOrders();
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  async changeOrderStatus(orderId: number, status: string): Promise<void> {
    try {
      const response = await this.adminService.changeOrderStatus(orderId, status);
      alert('Change success: ' + response);
      this.getAllOrders();
    } catch (error) {
      console.error('Error changing status:', error);
    }
  }
}