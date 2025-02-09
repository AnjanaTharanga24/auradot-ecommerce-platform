import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-seller-add-item-form',
  imports: [],
  templateUrl: './seller-add-item-form.component.html',
  styleUrl: './seller-add-item-form.component.css'
})
export class SellerAddItemFormComponent {

  constructor(private itemService : ItemService){

  }



}
