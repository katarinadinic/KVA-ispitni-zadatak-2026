import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Loading } from '../loading/loading';
import { Alerts } from '../alerts';
import { ToyService } from '../services/toy.service';

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
    MatSelectModule,
    Loading],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public activeUser = AuthService.getActiveUser()
  toys = signal<string[]>([])
  groups: TargetGroup[] = [
    { value: 'svi', viewValue: 'Svi' },
    { value: 'dečak', viewValue: 'Dečak' },
    { value: 'devojčica', viewValue: 'Devojčica' },
  ];
  oldPassword = ''
  newPassword = ''
  passRepeat = ''

  constructor(private router: Router) {
    if (!AuthService.getActiveUser()) {
      router.navigate(['/login'])
      return
    }

    /* ToyService.getToyById()
    .then(rsp => this.toys.set(rsp.data)) */
  }

  getAvatarUrl() {
    return `https://ui-avatars.com/api/?name=${this.activeUser?.firstName}+${this.activeUser?.lastName}`
  }

  updateUser() {
    Alerts.confirm('Are you sure you want to update user info?',
      () => {
        AuthService.updateActiveUser(this.activeUser!)
        Alerts.success('User updated successfuly')
      })
  }

  updatePassword() {
    Alerts.confirm('Are you sure you want to change the password?',
      () => {
        if (this.oldPassword != this.activeUser?.password) {
          Alerts.error('Invalid old password')
          return
        }

        if (this.newPassword.length < 6) {
          Alerts.error('Password must be at least 6 characters long')
          return
        }

        if (this.newPassword != this.passRepeat) {
          Alerts.error('Passwords do not match')
          return
        }

        if (this.newPassword == this.activeUser.password) {
          Alerts.error('New password cannot be the same as the old one')
          return
        }

        AuthService.updateActiveUserPassword(this.newPassword)
        Alerts.success('Password updated successfuly')
        AuthService.logout()
        this.router.navigate(['/login'])
      })
  }
}
