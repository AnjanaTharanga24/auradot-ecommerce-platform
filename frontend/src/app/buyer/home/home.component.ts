import { Component } from '@angular/core';
import { ItemCardComponent } from "../../buyer/item-card/item-card.component";
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ItemService } from '../../services/item-service/item.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemCardComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  items: any[] = [];

  constructor(private itemService: ItemService) {}

  async ngOnInit() {
    try {
      this.items = await this.itemService.getAllItems();
      console.log('Fetched items:', this.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }
}
