import { Order } from "./order";
import { Product } from "./product";


export class CartItem {
  constructor(
    public id: number,
    public price: number,
    public quantity: number,
    public product: Product,
    public order: Order
  ) {}
}