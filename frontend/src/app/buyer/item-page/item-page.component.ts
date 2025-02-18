import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item-service/item.service';
import { ActivatedRoute } from '@angular/router';
import { Item, ItemResponse } from '../../common/item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-page',
  imports: [CommonModule],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css',
})
export class ItemPageComponent implements OnInit {
  item?: ItemResponse;
  itemId? : number;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
      this.getItemById(Number(this.itemId));
  }

  getStatusClass(): string {
    const status = this.item?.status?.toLowerCase();
    switch (status) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  }

 async getItemById(id: number) {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.itemId = id;

      const response = await this.itemService.getItemById(id);
      this.item = response;
      console.log('Response:', response);
    } catch (error) {
      console.log('Error fetching item by ID:', error);
    }
  }
}
