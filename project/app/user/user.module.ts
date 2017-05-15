import { ProfileRouteActivator } from './profile-route-activator.service';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userRoutes } from './user.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild(userRoutes)
    ],
    declarations: [
        ProfileComponent,
        LoginComponent
    ],
    providers: [
        ProfileRouteActivator
    ]

})
export class UserModule {}