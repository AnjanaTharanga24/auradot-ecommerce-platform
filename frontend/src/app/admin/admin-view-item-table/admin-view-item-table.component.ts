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

  async ngOnInit() {
    try {
      this.items = await this.inventoryService.getAllItems();
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }
}