import { Component, Input } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() item: any;

  constructor(private itemService: ItemService) {}

  getStockStatusColor(status: string): string{
    switch(status){
      case 'available':
        return 'green';
      case 'low_stock':
        return '#eae013';
      case 'out_of_stock':
        return 'red';
      default:
        return '';
    }
  }

  handleIncrease(item: any) {
    if (item.quantity < 10) {
      item.quantity = item.quantity + 1; 
    } else {
      alert("You can only add up to 10 items");
    }
  }
  
  handleDecrease(item: any) {
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1; 
    } else {
      alert("Quantity can't be less than 0");
    }
  }
}