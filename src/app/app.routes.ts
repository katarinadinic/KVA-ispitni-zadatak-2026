import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Details } from './details/details';
import { Login } from './login/login';
import { User } from './user/user';
import { Order } from './order/order';
import { Cart } from './cart/cart';
import { Signup } from './signup/signup';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'details/:toyId', component: Details },
    { path: 'details/:toyId/order', component: Order },
    { path: 'login', component: Login },
    { path: 'user', component: User },
    { path: 'cart', component: Cart },
    { path: 'signup', component: Signup }
];
