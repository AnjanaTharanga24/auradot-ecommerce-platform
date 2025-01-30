import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0); 
  cartCount$ = this.cartCountSubject.asObservable(); 

  getCartCount(): number {
    return this.cartCountSubject.value;
  }

  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }
  incrementCartCount(): void {
    const currentCount = this.cartCountSubject.value;
    this.cartCountSubject.next(currentCount + 1);
  }
}
