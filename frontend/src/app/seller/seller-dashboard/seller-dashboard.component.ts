import { Component } from '@angular/core';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";
import { SellerAddItemFormComponent } from "../seller-add-item-form/seller-add-item-form.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  imports: [SellerNavComponent, SellerAddItemFormComponent,RouterLink],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {

}
