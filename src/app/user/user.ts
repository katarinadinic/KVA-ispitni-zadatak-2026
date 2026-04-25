import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import axios from 'axios';

interface TargetGroup {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user',
  imports: [MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSelectModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public activeUser = AuthService.getActiveUser()
  groups: TargetGroup[] = [
    {value: 'svi', viewValue: 'Svi'},
    {value: 'dečak', viewValue: 'Dečak'},
    {value: 'devojčica', viewValue: 'Devojčica'},
  ];

  constructor(private router: Router) {
    if (!AuthService.getActiveUser()) {
      router.navigate(['/login'])
      return
    }
  }

  updateUser() {
    AuthService.updateActiveUser(this.activeUser!)
  }
}
