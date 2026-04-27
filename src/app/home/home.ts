import { Component, signal, computed } from '@angular/core';
import { ToyModel, ToyType } from '../../models/toy.model';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Utils } from '../utils';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { ToyService } from '../../services/toy.service';
import { Loading } from '../loading/loading';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    Loading,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public authService = AuthService
  toys = signal<ToyModel[]>([]);
  favorites = signal<ToyType[]>([]);
  datumi = signal<ToyModel[]>([]);

  fromDate = signal<string>('all');
  toDate = signal<string>('all');

  searchQuery = signal<string>('');
  selectedType = signal<string>('all');
  selectedTarget = signal<string>('all');
  selectedDate = signal<string>('all');
  maxPrice = signal<number>(15000);

  constructor(public utils: Utils) {
    ToyService.getToys()
      .then(rsp => this.toys.set(rsp.data))

    ToyService.getToyType()
      .then(rsp => this.favorites.set(rsp.data))

    ToyService.getToys().then(rsp => {
      const sorted = rsp.data.sort((t1: any, t2: any) => {
        return new Date(t2.productionDate).getTime() - new Date(t1.productionDate).getTime();
      });
      this.datumi.set(sorted);
    });
  }

  filteredToys = computed(() => {
    return this.toys().filter(t => {
      const search = this.searchQuery().toLowerCase();
      const matchText = t.name.toLowerCase().includes(search) || t.description.toLowerCase().includes(search);
      const matchType = this.selectedType() === 'all' || t.type.name === this.selectedType();
      const matchTarget = this.selectedTarget() === 'all' || t.targetGroup === this.selectedTarget();
      const matchPrice = t.price <= this.maxPrice();
      const matchFrom = this.fromDate() === 'all' || t.productionDate >= this.fromDate();
      const matchTo = this.toDate() === 'all' || t.productionDate <= this.toDate();
      return matchText && matchType && matchTarget && matchPrice && matchFrom && matchTo;
    });
  });

  getAvailableDates() {
    const dates = new Set<string>()
    for (let t of this.datumi()) {
      dates.add(t.productionDate)
    }
    return Array.of(...dates)
  }
}
