import { Component } from '@angular/core';
import { ItemCardComponent } from "../../buyer/item-card/item-card.component";
import { ItemService } from '../../services/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  items: any[] = [];

  constructor(private itemService: ItemService) {}

  async ngOnInit() {
    try {
      this.items = await this.itemService.getAllItems();
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }
}
