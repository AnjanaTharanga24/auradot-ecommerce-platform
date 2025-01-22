import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { SellerComponent } from './seller/seller.component';

export const routes: Routes = [
    { path: '', component: ItemListComponent },
    { path: 'seller-dashboard', component: SellerComponent },

];
