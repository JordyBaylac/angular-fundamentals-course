import { AuthService } from './user/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'event-app',
    template: `
        <nav-bar></nav-bar>
        <h1 class="">{{title}}</h1>
        <router-outlet></router-outlet>
    `
})
export class EventAppComponent{
    title = 'Jordy Baylac on';

    constructor(private _auth: AuthService){}

    ngOnInit(){
        this._auth.checkAuthenticationStatus();
    }

}