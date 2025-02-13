import { Component, OnInit } from '@angular/core';
import { AdminViewItemTableComponent } from "../admin-view-item-table/admin-view-item-table.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { InventoryServiceService } from '../../services/inventory-service/inventory-service.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminViewItemTableComponent, SidebarComponent, AdminHeaderComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  // items: any[] = [];

  // constructor(private inventoryService: InventoryServiceService) {}

  async ngOnInit() {
   
  }

  // async loadItems() {
  //   try {
  //     this.items = await this.inventoryService.getAllItems();
  //   } catch (error) {
  //     console.error('Error loading items:', error);
  //   }
  // }

 
}
