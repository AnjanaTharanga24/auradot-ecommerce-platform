import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() addToCart = new EventEmitter<number>();

  onAddToCart() {
    this.addToCart.emit(this.product.id);
  }
}
