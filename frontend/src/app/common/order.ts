import { CartItem } from "./cart-item";

export enum OrderStatus {
    PLACED = 'placed',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered'
  }
  
  export class Order {
    constructor(
      public id: number,
      public orderDescription: string,
      public date: Date,
      public address: string,
      public amount: number,
      public orderStatus: OrderStatus,
      public totalAmount: number,
      public trackingId: string,
      public cartItems: CartItem[]
    ) {}
  }