import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar-component/navbar-component.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NavbarComponent],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  start() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}