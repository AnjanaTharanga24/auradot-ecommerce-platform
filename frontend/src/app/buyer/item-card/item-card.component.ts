import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item-service/item.service';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css',
})
export class ItemCardComponent implements OnInit {


  onAddToCart() {
    this.addToCart(this.item.id);
  }

  @Input() item: any;

  constructor(
    private itemService: ItemService,
    private customerService: CustomerService,
   
  ) {}

  getStockStatusClass(status: string): string {
    switch (status) {
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

  handleIncrease(item: any) {
    if (item.quantity < 10) {
      item.quantity = item.quantity + 1;
    } else {
      alert('You can only add up to 10 items');
    }
  }

  handleDecrease(item: any) {
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1;
    } else {
      alert("Quantity can't be less than 0");
    }
  }
  async addToCart(id: any): Promise<void> {
    try {
      const response = await this.customerService.addToCart(id);
      alert('Product added to cart: ' + response);
    } catch (error) {
      console.log('Error adding product:', error);
    }
  }

  ngOnInit() {
  }

 
}
