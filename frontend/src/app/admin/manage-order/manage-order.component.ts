import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../../common/order';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component'; // Import the dialog component


@Component({
  selector: 'app-manage-order',
  imports: [MatCard, MatCardContent, MatTableModule, MatMenu, MatMenuTrigger],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private http: HttpClient,
  private snackBar: MatSnackBar,
  private adminService: AdminService,
  private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.adminService.getAllOrders()
      .then((orders) => {
        this.orders = orders;
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }

  changeOrderStatus(orderId: number, status: string): void {
    this.adminService.changeOrderStatus(orderId, status)
      .then((response) => {
        this.openSuccessDialog('Order status changed successfully!'); // Open dialog on success
        this.getAllOrders();
      })
      .catch((error) => {
        console.error('Error changing status:', error);
      });
  }
  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message: message },
      width: '300px', // Set the width of the dialog
      panelClass: 'success-dialog' // Optional: Add a custom class for styling
    });
  }
}