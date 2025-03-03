import { Component } from '@angular/core';
import { ItemCardComponent } from '../../buyer/item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ItemService } from '../../services/item-service/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemCardComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  items: any[] = [];
  theKeyword: string = '';

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.theKeyword = this.route.snapshot.paramMap.get('name')!;

    if (this.theKeyword) {
      this.handleSearch();
    } else {
      this.getAllItems();
    }
  }

  async getAllItems() {
    try {
      this.items = await this.itemService.getAllItems();
      console.log('Fetched items:', this.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  async handleSearch() {
    if (this.theKeyword) {
      try {
        this.items = await this.itemService.searchItems(this.theKeyword);
        console.log('Fetched items:', this.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }
  }
}