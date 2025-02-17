import { Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { ManageOrderComponent } from './admin/manage-order/manage-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { HomeComponent } from './buyer/home/home.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { SellerAddItemFormComponent } from './seller/seller-add-item-form/seller-add-item-form.component';
import { SellerViewItemComponent } from './seller/seller-view-item/seller-view-item.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminViewItemTableComponent } from './admin/admin-view-item-table/admin-view-item-table.component';
import { SellerNotificationsComponent } from './seller/seller-notifications/seller-notifications.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent },
    { path: 'payment', component: CheckoutComponent },
    // { path: 'product', component: ProductComponent },
    { path: 'carts', component: CartComponent },
    { path: 'adminOrders', component: ManageOrderComponent },
    { path: 'myOrders', component: MyOrdersComponent },
    { path: 'home', component: HomeComponent },
    { path: 'seller-dashboard', component: SellerDashboardComponent },
    { path: 'seller-view', component: SellerViewItemComponent },
    { path: 'seller-notification', component: SellerNotificationsComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'admin-view-item', component: AdminViewItemTableComponent },

   
];
