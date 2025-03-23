import { Component, OnInit } from '@angular/core';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item-service/item.service';

@Component({
  selector: 'app-seller-notifications',
  imports: [SellerNavComponent, CommonModule],
  templateUrl: './seller-notifications.component.html',
  styleUrl: './seller-notifications.component.css'
})
export class SellerNotificationsComponent implements OnInit {

  outOfStocks: any[] = [];
  lowStocks: any[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.getNotifications();
  }

  async getNotifications() {
    try {
      const notifications = await this.itemService.getNotifications();
      this.outOfStocks = notifications.filter((item: any) => item.stockStatus === 'OUT_OF_STOCK');
      this.lowStocks = notifications.filter((item: any) => item.stockStatus === 'LOW_STOCK');

      console.log('Out of stock items:', this.outOfStocks);
      console.log('Low stock items:', this.lowStocks);
    } catch (error) {
      console.log('Error :', error);
    }
  }
}