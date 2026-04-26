import { Component, signal } from '@angular/core';
import { ToyModel } from '../../models/toy.model';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToyService } from '../../services/toy.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Loading } from '../loading/loading';
import { Utils } from '../utils';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-order',
  imports: [
    MatCardModule,
    FormsModule,
    MatButtonModule,
    Loading,
    MatListModule,
    MatIconModule,
    MatFormField,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  public activeUser = AuthService.getActiveUser();

  toy = signal<ToyModel | null>(null)

  public address: string = '';
  public phone: string = '';
  public note: string = '';
  public quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    public utils: Utils,
    public router: Router
  ) {
    this.route.params.subscribe(params => {
      const id = Number(params['toyId'])
      ToyService.getToyById(id)
        .then(rsp => {
          this.toy.set(rsp.data)
        })
    })

    if (this.activeUser) {
      this.address = this.activeUser.address || '';
      this.phone = this.activeUser.phone || '';
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateTotal() {
    if (this.quantity < 1) this.quantity = 1;
  }

  placeOrder() {
    const currentToy = this.toy();
    if (!currentToy) return;

    const orderData: any = {
      address: this.address,
      phone: this.phone,
      note: this.note,
      quantity: this.quantity,
      totalPrice: (currentToy.price * this.quantity) + 300,
      toyName: currentToy.name,
      type: currentToy.type.name,
      age: currentToy.ageGroup.name,
      targetGroup: currentToy.targetGroup,

      userId: this.activeUser?.email || 'guest',
      date: new Date().toISOString(),
      state: 'ordered'
    };

    Alerts.confirm(`Are you sure you want to place the order for ${((this.toy()?.price ?? 0) * this.quantity) + 300} RSD?`, () => {
      AuthService.createOrder(orderData, currentToy.toyId);
      Alerts.success(`You have successfully booked ${this.quantity} pc. of toy: ${currentToy.name}`);
      this.router.navigate(['/cart']);
    })
  }

}
