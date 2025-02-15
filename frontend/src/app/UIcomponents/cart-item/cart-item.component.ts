import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-item',
  imports: [MatIcon, MatIconModule ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})

export class CartItemComponent {
  @Input() item: any;
  @Output() increaseQuantity = new EventEmitter<string>();
  @Output() decreaseQuantity = new EventEmitter<string>();
  @Output() removeItem = new EventEmitter<number>();

  onIncrease() {
    this.increaseQuantity.emit(this.item.productId);
  }

  onDecrease() {
    this.decreaseQuantity.emit(this.item.productId);
  }

  onRemove() {
    this.removeItem.emit(this.item.id); 
  }
}
