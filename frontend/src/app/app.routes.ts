import { Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { ManageOrderComponent } from './admin/manage-order/manage-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

export const routes: Routes = [
    { path: '', redirectTo: 'product', pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent },
    { path: 'payment', component: CheckoutComponent },
    { path: 'product', component: ProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'adminOrders', component: ManageOrderComponent },
    { path: 'myOrders', component: MyOrdersComponent },
];
