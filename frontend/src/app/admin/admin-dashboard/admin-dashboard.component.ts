import { Component, OnInit } from '@angular/core';
import { AdminViewItemTableComponent } from "../admin-view-item-table/admin-view-item-table.component";
import { InventoryServiceService } from '../../services/inventory-service.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AdminHeaderComponent } from "../admin-header/admin-header.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminViewItemTableComponent, SidebarComponent, AdminHeaderComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  items: any[] = [];

  constructor(private inventoryService: InventoryServiceService) {}

  async ngOnInit() {
    await this.loadItems();
  }

  async loadItems() {
    try {
      this.items = await this.inventoryService.getAllItems();
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }

  // async deleteItem(itemId: number) {
  //   if (confirm('Are you sure you want to delete this item?')) {
  //     const success = await this.inventoryService.deleteItem(itemId);
  //     if (success) {
  //       this.items = this.items.filter(item => item.id !== itemId);
  //     }
  //   }
  // }
}
