import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
   items : any[] = [];
  async getAllItems(){
    try {
      const response = await axios.get(`http://localhost:8080/api/items/`);
      this.items = response.data;
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching items : " + error);
    }
  }

  ngOnInit(){
    this.getAllItems();
  }

}
