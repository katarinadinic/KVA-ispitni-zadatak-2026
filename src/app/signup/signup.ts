import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserModel } from '../../models/user.model';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-signup',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  user: UserModel = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    password: '',
    favorites: '',
    orders: []
  }

  repeat: string = '';

  toyTypes = signal<string[]>(['Puzzle', 'Plišane igračke', 'Vozila', 'Edukativne', 'Lutke']);

  constructor(public router: Router) { }

  doSignup() {

    if (!this.user.email || !this.user.password || !this.user.firstName || !this.user.favorites) {
      Alerts.error('All fields must be filled in!');
      return;
    }


    if (AuthService.existsByEmail(this.user.email)) {
      Alerts.error('This email is already registered!');
      return;
    }

    if (this.user.password.length < 6) {
      Alerts.error('Password must have at least 6 characters!');
      return;
    }


    if (this.user.password !== this.repeat) {
      Alerts.error('Passwords do not match!');
      return;
    }

    AuthService.createUser(this.user);
    Alerts.success('Account created successfully!');
    this.router.navigate(['/login']);
  }
}
