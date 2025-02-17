import { CartItem } from "./cart-item";

export enum OrderStatus {
    PLACED = 'PLACED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED'
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