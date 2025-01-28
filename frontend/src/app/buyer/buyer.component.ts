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

}
