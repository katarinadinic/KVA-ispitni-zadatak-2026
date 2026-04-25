import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import axios from 'axios';
import { ToyModel } from '../../models/toy.model';
import { Utils } from '../utils';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, MatListModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public authService = AuthService
  toy = signal<ToyModel | null>(null)

  constructor(route: ActivatedRoute, public utils: Utils) {
    route.params.subscribe(params => {
      const toyId = params['toyId']
      axios.get(`https://toy.pequla.com/api/toy/${toyId}`)
        .then(rsp => this.toy.set(rsp.data))
    })
  }
}
