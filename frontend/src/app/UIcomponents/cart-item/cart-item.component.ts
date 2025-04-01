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
  @Output() increaseQuantity = new EventEmitter<number>();
  @Output() decreaseQuantity = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<number>();

  onDecrease() {
    this.decreaseQuantity.emit(this.item.id); // Emit product ID
  }
  
  onIncrease() {
    this.increaseQuantity.emit(this.item.id); // Emit product ID
  }

  onRemove() {
    this.removeItem.emit(this.item.id); 
  }
}