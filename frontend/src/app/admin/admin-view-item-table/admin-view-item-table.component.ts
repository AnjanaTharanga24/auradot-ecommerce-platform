import { Component, OnInit } from '@angular/core';
import { InventoryServiceService } from '../../services/inventory-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-view-item-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-view-item-table.component.html',
  styleUrl: './admin-view-item-table.component.css'
})
export class AdminViewItemTableComponent implements OnInit {
  items: any[] = [];

  constructor(private inventoryService: InventoryServiceService) {}

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
    try {
      this.items = await this.inventoryService.getAllItems();
      console.log('Fetched items:', this.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }
}