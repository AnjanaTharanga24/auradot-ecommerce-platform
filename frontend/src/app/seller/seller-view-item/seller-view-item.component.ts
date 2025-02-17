import { Component, OnInit } from '@angular/core';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";
import { RouterLink } from '@angular/router';
import { ItemService } from '../../services/item-service/item.service';
import { Item } from '../../common/item';
import { InventoryServiceService } from '../../services/inventory-service/inventory-service.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { CommonModule } from '@angular/common';
import { SellerNotificationsComponent } from "../seller-notifications/seller-notifications.component";

@Component({
  selector: 'app-seller-view-item',
  standalone: true,
  imports: [SellerNavComponent, RouterLink, CommonModule, SellerNotificationsComponent],
  templateUrl: './seller-view-item.component.html',
  styleUrl: './seller-view-item.component.css'
})
export class SellerViewItemComponent implements OnInit {

 items: any[] = [];
 
   constructor(private inventoryService: InventoryServiceService,
               private alertService: AlertService
   ) {}
 
   getStockStatusClass(status: string): string {
     switch(status) {
       case 'available':
         return 'status-available';
       case 'low_stock':
         return 'status-low';
       case 'out_of_stock':
         return 'status-out';
       default:
         return 'status-default';
     }
   }
 
   async ngOnInit() {
    this.getAllItems();
   }

   async getAllItems(){
    try {
      this.items = await this.inventoryService.getAllItems();
      console.log('Fetched items:', this.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
   }
 
   async deleteItemsById(id: number) {
        
     const isConfirmed = await this.alertService.confirmDelete();
 
     if (isConfirmed) {
         try {
           const response = await this.inventoryService.itemDeleteById(id);
           this.items = this.items.filter(item => item.id !== id);
           this.alertService.showSuccess('Your item has been deleted.');
           console.log(response.data)
         } catch (error) {
           console.error('Error deleting item:', error);
           this.alertService.showError('Failed to delete the item.');
         }
     }
   }

}
