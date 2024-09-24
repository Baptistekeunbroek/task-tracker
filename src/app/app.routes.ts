import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TaskListComponent , canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

