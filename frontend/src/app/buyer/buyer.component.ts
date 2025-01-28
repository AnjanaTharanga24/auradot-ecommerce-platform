import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-buyer',
  imports: [CommonModule],
  templateUrl: './buyer.component.html',
  styleUrl: './buyer.component.css'
})
export class BuyerComponent {
  items :any[] = [];

  async getCartItems(){
    try {
      const response = await axios.get("http://localhost:8080/api/buyer/items")
      this.items = response.data;
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit(){
    this.getCartItems()
  }

  async updateQuantity(itemId: number, newQuantity: number) {
    try {
      const updateQuantityRequest = { quantity: newQuantity };
      const response = await axios.put(
        `http://localhost:8080/api/buyer/items/${itemId}`,
        updateQuantityRequest
      );
      console.log('Quantity updated:', response.data);
      this.getCartItems(); 
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }
  
  handleIncrease(item: any) {
    if (item.quantity < 10) {
      item.quantity++;
      this.updateQuantity(item.id, item.quantity);
    } else {
      alert('You can only add up to 10 items');
    }
  }
  
  handleDecrease(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
      this.updateQuantity(item.id, item.quantity);
    } else {
      alert("Quantity can't be less than 0");
    }
  }
  

}
