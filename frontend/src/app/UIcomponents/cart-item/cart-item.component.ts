import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cart-item',
  imports: [MatIcon],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() item: any;
  @Output() increaseQuantity = new EventEmitter<string>();
  @Output() decreaseQuantity = new EventEmitter<string>();

  onIncrease() {
    this.increaseQuantity.emit(this.item.productId);
  }

  onDecrease() {
    this.decreaseQuantity.emit(this.item.productId);
  }
}
