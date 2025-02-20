import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item-service/item.service';
import { ActivatedRoute } from '@angular/router';
import { Item, ItemResponse } from '../../common/item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-item',
  imports: [CommonModule],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css'
})
export class UpdateItemComponent implements OnInit{

  itemId? : number;
  item? : ItemResponse;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute
  ){

  }
  ngOnInit() {
  this.getItemById(this.itemId!);
  }

  async getItemById(id: number){
     id = Number(this.route.snapshot.paramMap.get('id'));
     this.itemId = id;
    
     try {
      const data = await this.itemService.getItemById(id);
      this.item = data;
      console.log(data);
     } catch (error) {
      console.log('Error fetching item by ID:', error);
     }
  }

}
