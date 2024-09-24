import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar-component/navbar-component.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoginMode = true; // Flag to toggle between login and signup

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode; // Toggle the mode
    this.errorMessage = ''; // Clear any previous error messages
  }

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/tasks']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  signup() {
    if (this.authService.signup(this.username, this.password)) {
      this.router.navigate(['/tasks']);
    } else {
      this.errorMessage = 'Username already exists';
    }
  }
}
