import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../common/item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-add-item-form',
  imports: [FormsModule],
  templateUrl: './seller-add-item-form.component.html',
  styleUrl: './seller-add-item-form.component.css'
})
export class SellerAddItemFormComponent {

  item: Item = new Item('', '', 0,'', 0);
  constructor(private itemService : ItemService){

  }

  async addItem(){
    try {
      await this.itemService.sellerAddItems(this.item);
      alert('Item added successfully');
      this.item = new Item('', '', 0,'', 0);
    } catch (error) {
      alert('Error adding item');
    }
  }



}
