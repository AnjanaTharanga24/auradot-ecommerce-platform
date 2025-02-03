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

  addToCart(item: any) {
    this.itemService.addToCart(item).then(response => {
      console.log('Item added to cart:', response);
    }).catch(error => {
      console.error('Error adding to cart:', error);
    });
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