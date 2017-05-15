import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileRouteActivator implements CanActivate{

    constructor(private _authService: AuthService,
                private _router: Router){

    }

    canActivate(): boolean{
        let thereIsAUser = this._authService.isAuthenticated();
        if (!thereIsAUser){
            this._router.navigate(['/events']);
        }
        return thereIsAUser;
    }
}