import { Component } from '@angular/core';
import { AdminViewItemTableComponent } from "../admin-view-item-table/admin-view-item-table.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminViewItemTableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
