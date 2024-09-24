import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_STORAGE_KEY = 'users'; // Key for storing users in local storage
  private readonly LOGIN_STATUS_KEY = 'isLoggedIn'; // Key for login status
  private idCounter: number = 1; // Initialize counter for user IDs

  constructor(private router: Router) {
    this.initializeUserIdCounter(); // Initialize the user ID counter
  }

  // Method to initialize the user ID counter based on existing users
  private initializeUserIdCounter(): void {
    const users = this.getStoredUsers(); // Get stored users
    if (Object.keys(users).length > 0) {
      this.idCounter = Math.max(...Object.values(users).map(user => user.id)) + 1; // Set counter to next available ID
    }
  }

  login(username: string, password: string): boolean {
    const users = this.getStoredUsers(); // Get the stored users from local storage
    const user = users[username]; // Get the user by username
    if (user && user.password === password) {
      localStorage.setItem(this.LOGIN_STATUS_KEY, 'true'); // Set login status
      localStorage.setItem('currentUser', JSON.stringify(user)); // Store current user
      return true;
    }
    return false; // Invalid login
  }

  signup(username: string, password: string): boolean {
    const users = this.getStoredUsers(); // Get the existing users
    if (users[username]) {
      return false; // User already exists
    }

    // Create a new user object with a unique ID
    const newUser = {
      id: this.idCounter++, // Assign a unique ID
      username,
      password,
    };

    users[username] = newUser; // Add new user
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(users)); // Save updated users
    console.log('New user created:', newUser); // Debugging: log new user
    return true; // Successful signup
  }

  isLoggedIn(): boolean {
    // Check if we are in a browser environment before accessing localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.LOGIN_STATUS_KEY) === 'true';
    }
    return false; // Default to false if not in a browser
  }

  getCurrentUserId(): number | null {
    if (typeof window !== 'undefined') { // Check if we're in a browser environment
      const currentUser = localStorage.getItem('currentUser'); // Retrieve user data from local storage
      if (currentUser) {
        const userData = JSON.parse(currentUser); // Parse the JSON string
        console.log('Current user data:', userData); // Debugging: log current user data
        return userData.id || null; // Return the user ID or null if not found
      }
    }
    return null; // Return null if no user is logged in
  }

  logout(): void {
    localStorage.removeItem(this.LOGIN_STATUS_KEY); // Remove login status
    localStorage.removeItem('currentUser'); // Remove current user
    this.router.navigate(['/login']); // Redirect to login
  }

  private getStoredUsers(): { [key: string]: { id: number; username: string; password: string } } {
    if (typeof window !== 'undefined') { // Ensure we're in a browser
      return JSON.parse(localStorage.getItem(this.USER_STORAGE_KEY) || '{}'); // Retrieve users
    }
    return {}; // Return empty object if not in a browser
  }
}
