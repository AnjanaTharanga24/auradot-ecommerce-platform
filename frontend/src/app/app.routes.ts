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
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { UserDashboardComponent } from './user-dashboard-section/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './user-dashboard-section/profile/profile.component';
import { OrderHistoryComponent } from './user-dashboard-section/order-history/order-history.component';
import { DeleteAccountComponent } from './user-dashboard-section/delete-account/delete-account.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'product', pathMatch: 'full' },
    { path: '', redirectTo: 'signin', pathMatch: 'full'},
    { path: 'product', component: ProductComponent},
    { path: 'orders', component: OrdersComponent },
    { path: 'payment', component: CheckoutComponent },
    { path: 'product', component: ProductComponent },
    { path: 'carts', component: CartComponent },
    { path: 'adminOrders', component: ManageOrderComponent },
    { path: 'myOrders', component: MyOrdersComponent },
    { path: 'home', component: HomeComponent },
    { path: 'seller-dashboard', component: SellerDashboardComponent },
    { path: 'seller-view', component: SellerViewItemComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'admin-view-item', component: AdminViewItemTableComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        children: [
            { path: 'profile', component: ProfileComponent},
            { path: 'delete-account', component: DeleteAccountComponent},
            { path: 'orders-history', component: OrderHistoryComponent},

            { path: '', redirectTo: 'profile', pathMatch: 'full' },
        ]
    }

   
];
