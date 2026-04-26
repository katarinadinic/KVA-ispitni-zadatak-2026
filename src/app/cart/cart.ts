import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { OrderModel } from '../../models/order.model';
import { Alerts } from '../alerts';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [
    MatCardModule,
    MatTableModule,
    RouterLink,
    MatIconModule,
    MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  displayedColumns = ['toyName', 'type', 'age', 'quantity', 'totalPrice', 'options'];

  constructor(public router: Router) {
    if (!AuthService.getActiveUser()) {
      router.navigate(['/login'])
      return
    }
  }

  getOrders() { return AuthService.getOrderByState('ordered'); }
  getArrivedOrders() { return AuthService.getOrderByState('arrived'); }
  getCanceledOrders() { return AuthService.getOrderByState('cancelled'); }

  calculateTotal() {
    return this.getOrders().reduce((acc, order) => acc + order.totalPrice, 0);
  }

  removeOrder(order: OrderModel) {
    Alerts.confirm(`Are you sure you want to cancel ${order.toyName}?`, () => {
      AuthService.cancelOrder(order.createdAt);
      this.reloadComponent();
    });
  }

  deleteArrived(order: OrderModel) {
    Alerts.confirm(`Delete ${order.toyName} from history?`, () => {
      AuthService.deleteArrivedOrder(order.createdAt);
      this.reloadComponent();
    });
  }

  payAll() {
    Alerts.confirm(`Confirm payment of ${this.calculateTotal()} RSD?`, () => {
      AuthService.payOrders();
      this.reloadComponent();
    });
  }

  rateToy(order: OrderModel) { }

  reloadComponent() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/cart']);
    });
  }
}
