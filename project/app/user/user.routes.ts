import { ProfileRouteActivator } from './profile-route-activator.service';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';
import { Routes } from '@angular/router';


export const userRoutes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [ProfileRouteActivator] },
    { path: 'login', component: LoginComponent }

];