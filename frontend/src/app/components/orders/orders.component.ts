import { Component } from '@angular/core';
import { ORDERS } from '../../data/orders';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  order = ORDERS;
}
