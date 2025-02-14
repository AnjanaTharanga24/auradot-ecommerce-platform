// seller-add-item-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Item } from '../../common/item';
import { ItemService } from '../../services/item-service/item.service';
import { ItemCategory } from '../../common/item-category';

@Component({
  selector: 'app-seller-add-item-form',
  templateUrl: './seller-add-item-form.component.html',
  styleUrls: ['./seller-add-item-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class SellerAddItemFormComponent implements OnInit{
  itemForm!: FormGroup;
  categories : ItemCategory[] = [];

  constructor(private fb: FormBuilder, private itemService: ItemService) {
    this.initializeForm();
  }
 

  private initializeForm(): void {
    this.itemForm = this.fb.group({
      name: [''],
      categoryId: [''],
      description: [''],
      imgUrl: [''],
      price: [''],
      stockQuantity: [''],
      minimumStockLevel: ['']
    });
  }

  async addItem(){
    try {
      const item: Item = this.itemForm.value;
      await this.itemService.sellerAddItems(item);
      alert('Item added successfully');
      this.itemForm.reset();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item');
    }
  }

  ngOnInit() {
  this.getAllCategories()
  }

  async getAllCategories(){
    try{
     this.categories = await this.itemService.getAllCategories();
     console.log(this.categories);
    }catch(error){
      console.log("error fetching categories");
    }
  }
}