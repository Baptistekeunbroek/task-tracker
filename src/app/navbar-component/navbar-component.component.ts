import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: "./navbar-component.component.html",
  styleUrls: ['./navbar-component.component.css'],
  imports: [RouterModule],
})
export class NavbarComponent {}
