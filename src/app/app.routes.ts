import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
    { path: 'first-component', component: AppComponent },
    { path: 'home-page', component: HomeComponent },
];
