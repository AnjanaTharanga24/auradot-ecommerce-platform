import { Component, OnInit } from '@angular/core';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";
import { Item } from '../../common/item';
import { InventoryServiceService } from '../../services/inventory-service/inventory-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-notifications',
  imports: [SellerNavComponent,CommonModule],
  templateUrl: './seller-notifications.component.html',
  styleUrl: './seller-notifications.component.css'
})
export class SellerNotificationsComponent implements OnInit{

  outOfStocks : Item[] = [];
  lowStocks : Item[] = [];

  constructor(private inventoryService : InventoryServiceService){

  }


  ngOnInit() {
    this.getAllItems();
  }

  async getAllItems() {
    try {
      const data = await this.inventoryService.getAllItems();
      this.outOfStocks = data.filter((item:Item) => item.inventory.stockStatus === 'OUT_OF_STOCK');
      this.lowStocks = data.filter((item:Item) => item.inventory.stockStatus === 'LOW_STOCK');
      
      console.log('Out of stock items:', this.outOfStocks);
      console.log('Low stock items:', this.lowStocks);
    } catch (error) {
      console.log('error fetching items', error);
    }
  }

}
