import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { SellerComponent } from './seller/seller.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    { path: '', component: ItemListComponent },
    { path: 'seller-dashboard', component: SellerComponent },
    { path: 'admin-dashboard', component: AdminComponent },

];
