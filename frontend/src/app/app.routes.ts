import { Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { ManageOrderComponent } from './admin/manage-order/manage-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SellerComponent } from './seller/seller.component';
import { AdminComponent } from './admin/admin.component';
import { BuyerComponent } from './buyer/buyer.component';
import { HomeComponent } from './buyer/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'product', pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent },
    { path: 'payment', component: CheckoutComponent },
    { path: 'product', component: ProductComponent },
    { path: 'carts', component: CartComponent },
    { path: 'adminOrders', component: ManageOrderComponent },
    { path: 'myOrders', component: MyOrdersComponent },
    { path: 'home', component: HomeComponent },
    { path: 'seller-dashboard', component: SellerComponent },
    { path: 'admin-dashboard', component: AdminComponent },
    { path: 'cart', component: BuyerComponent },
];
