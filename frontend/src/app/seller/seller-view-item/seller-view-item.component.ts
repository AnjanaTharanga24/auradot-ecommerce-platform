import { Component } from '@angular/core';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-view-item',
  imports: [SellerNavComponent,RouterLink],
  templateUrl: './seller-view-item.component.html',
  styleUrl: './seller-view-item.component.css'
})
export class SellerViewItemComponent {

}
