import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import axios from 'axios';
import { ToyModel } from '../../models/toy.model';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Utils } from '../utils';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  toys = signal<ToyModel[]>([])

  constructor(public utils: Utils) {
    localStorage.setItem('time', JSON.stringify({ t: new Date().toISOString() }))
    axios.get('https://toy.pequla.com/api/toy')
      .then(rsp => this.toys.set(rsp.data))
  }
}
