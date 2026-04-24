import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatInputModule, MatAnchor],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
