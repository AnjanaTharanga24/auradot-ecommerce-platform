import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert-service/alert.service';
import { InventoryServiceService } from '../../services/inventory-service/inventory-service.service';

@Component({
  selector: 'app-admin-view-item-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-view-item-table.component.html',
  styleUrl: './admin-view-item-table.component.css'
})
export class AdminViewItemTableComponent implements OnInit {
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