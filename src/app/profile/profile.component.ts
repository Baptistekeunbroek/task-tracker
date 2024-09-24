import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar-component/navbar-component.component';
import { AuthService } from '../services/auth.service'; // Import your AuthService
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent], // Include CommonModule here
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: { username?: string; password?: string } = {}; // Initialize user object
  isLoggedIn: boolean = false; // Track login status

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus(); // Check if the user is logged in
    this.fetchUserData(); // Fetch user data if logged in
  }

  // Check if the user is logged in
  private checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']); // Redirect to login if not logged in
    }
  }

  // Fetch user data from local storage
  private fetchUserData() {
    if (typeof window !== 'undefined') { // Check if we are in a browser environment
      const currentUser = localStorage.getItem('currentUser'); // Get current user data
      if (currentUser) {
        this.user = JSON.parse(currentUser); // Parse and assign user data
      }
    }
  }

  // Logout the user
  disconnect() {
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
