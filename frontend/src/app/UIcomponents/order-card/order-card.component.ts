import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-order-card',
  imports: [ CommonModule, MatCardContent,MatCard],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {
getProgress() {
throw new Error('Method not implemented.');
}
  @Input() order: any;

  getOrderProgress(status: string): string {
    switch (status) {
      case 'PLACED': return '33%';
      case 'SHIPPED': return '66%';
      case 'DELIVERED': return '100%';
      default: return '0%';
    }
  }
}