import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import axios from 'axios';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() item: any;

  constructor(private itemService: ItemService) {}

  addToCart(item: any) {
    this.itemService.addToCart(item).then(response => {
      console.log('Item added to cart:', response);
    }).catch(error => {
      console.error('Error adding to cart:', error);
    });
  }
  
//   items : any[] = [];
//   async getAllItems() {
//    try {
//      const response = await axios.get(`http://localhost:8080/api/items`);
//      this.items = response.data.map((item: any) => ({
//        ...item,
//        quantity: 0, 
//      }));
//      console.log(this.items);
//    } catch (error) {
//      console.log("Error fetching items: " + error);
//    }
//  }
 

//  ngOnInit(){
//    this.getAllItems();
//  }

//  async addToCart(item:any){
//   const cartRequest ={
//        name : item.name,
//        description : item.description,
//        category : item.category,
//        quantity: item.quantity,
//        price: item.price,
//    }

//    try {
//      const response = await axios.post(`http://localhost:8080/api/buyer/items`,cartRequest);
//      console.log(response.data)
//    } catch (error) {
//      console.log('Error adding to cart',error)
//    }
//  }

 handleIncrease(item: any) {
   if (item.quantity < 10) {
     item.quantity = item.quantity + 1; 
   } else {
     alert("You can only add up to 10 items");
   }
 }
 
 handleDecrease(item: any) {
   if (item.quantity > 0) {
     item.quantity = item.quantity - 1; 
   } else {
     alert("Quantity can't be less than 0");
   }
 }
}
