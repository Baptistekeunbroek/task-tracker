import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_STORAGE_KEY = 'users'; 
  private readonly LOGIN_STATUS_KEY = 'isLoggedIn'; 
  private idCounter: number = 1; 

  constructor(private router: Router) {
    this.initializeUserIdCounter();
  }


  private initializeUserIdCounter(): void {
    const users = this.getStoredUsers();
    if (Object.keys(users).length > 0) {
      this.idCounter = Math.max(...Object.values(users).map(user => user.id)) + 1; 
    }
  }

  login(username: string, password: string): boolean {
    const users = this.getStoredUsers();
    const user = users[username]; 
    if (user && user.password === password) {
      localStorage.setItem(this.LOGIN_STATUS_KEY, 'true'); 
      localStorage.setItem('currentUser', JSON.stringify(user)); 
      return true;
    }
    return false; 
  }

  signup(username: string, password: string): boolean {
    const users = this.getStoredUsers(); 
    if (users[username]) {
      return false; 
    }

    const newUser = {
      id: this.idCounter++,
      username,
      password,
    };

    users[username] = newUser;
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(users)); 
    console.log('New user created:', newUser); 
    return true; 
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.LOGIN_STATUS_KEY) === 'true';
    }
    return false; 
  }

  getCurrentUserId(): number | null {
    if (typeof window !== 'undefined') { 
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const userData = JSON.parse(currentUser); 
        console.log('Current user data:', userData);
        return userData.id || null; 
      }
    }
    return null; 
  }

  logout(): void {
    localStorage.removeItem(this.LOGIN_STATUS_KEY);
    localStorage.removeItem('currentUser'); 
    this.router.navigate(['/login']); 
  }

  private getStoredUsers(): { [key: string]: { id: number; username: string; password: string } } {
    if (typeof window !== 'undefined') { 
      return JSON.parse(localStorage.getItem(this.USER_STORAGE_KEY) || '{}'); 
    }
    return {};
  }
}
