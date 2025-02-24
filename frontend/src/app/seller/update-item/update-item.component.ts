import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item-service/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemResponse, updateRequest } from '../../common/item';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-item',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css'
})
export class UpdateItemComponent implements OnInit {

  itemId?: number;
  item?: ItemResponse;
  updateForm: FormGroup;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: [''],
      description: [''],
      stockQuantity: [''],
      minimumStockLevel: [''],
      price: ['']
    });
  }

  ngOnInit() {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.itemId) {
      this.getItemById(this.itemId);
    }
  }

  async getItemById(id: number) {
    try {
      const data = await this.itemService.getItemById(id);
      this.item = data;
      this.updateForm.patchValue({
        name: data.name,
        description: data.description,
        stockQuantity: data.stockQuantity,
        minimumStockLevel: data.minimumStockLevel,
        price: data.price
      });
    } catch (error) {
      console.log('Error fetching item by ID:', error);
    }
  }

  async updateItem() {
    if (this.updateForm.valid && this.itemId) {
      const updatedItem: updateRequest = this.updateForm.value;
      try {
        const data = await this.itemService.updateItemById(this.itemId, updatedItem);
        console.log('Item updated successfully:', data);
        this.router.navigate(['/seller-view']);
      } catch (error) {
        console.log('Error updating item by ID:', error);
      }
    }
  }
}