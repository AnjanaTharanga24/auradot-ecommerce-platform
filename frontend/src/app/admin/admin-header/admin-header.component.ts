import { Component, OnInit } from '@angular/core';
import { InventoryServiceService } from '../../services/inventory-service.service';
import { Item } from '../../common/item';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit{

  totalItems: number = 0;
  lowStockItems: number = 0;
  outOfStockItems: number = 0;

  constructor(private inventoryService : InventoryServiceService){
  
  }
  async ngOnInit(){
     try {
      const items : Item[] = await this.inventoryService.getAllItems();

      this.totalItems = items.length;
      this.lowStockItems = items.filter(item => item.inventory.stockStatus === 'LOW_STOCK').length;
      this.outOfStockItems = items.filter(item => item.inventory.stockStatus === 'OUT_OF_STOCK').length;
     } catch (error) {
      console.error('Error fetching inventory data:', error);
     }
  }

}
