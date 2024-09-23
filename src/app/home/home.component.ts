import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar-component/navbar-component.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NavbarComponent],
})
export class HomeComponent {
  constructor(private router: Router) {}

  start() {
    this.router.navigate(['/tasks']); // Navigate to tasks page
  }
}
