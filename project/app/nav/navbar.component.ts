import { Toastr } from './../common/toastr.service';

import { ISession,
         EventService
} from './../events/shared/barrel.index';
import { AuthService } from './../user/auth.service';
import { Component, Inject } from '@angular/core';
import { TOASTR_OPAQUE_TOKEN } from '../common/toastr.service';
import { Router } from '@angular/router';
import { IEvent } from '../events/shared/event.model';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: 'navbar.component.html',
    styles: [`
        .nav.navbar-nav {font-size: 15px;}
        #searchForm {margin-right: 100px;}
        @media (max-width: 1200px) {
            #searchForm {display:none;}
        }
        li > a.active { color: #F97924; }
    `]

})
export class NavBarComponent{

    searchTerm = '';
    foundSessions: ISession[];
    events: IEvent[] = [];

    constructor(private _authService: AuthService,
                private _eventService: EventService,
                @Inject(TOASTR_OPAQUE_TOKEN) private toastr: Toastr,
                private _router: Router){}

    ngOnInit(){
        this._eventService.getEvents().subscribe( eventos => {
            this.events = eventos;
        });
    }

    thereIsUserLogged(): boolean{
        return this._authService.isAuthenticated();
    }

    getUserNameLogged(): string{
        return this._authService.currentUser.firstName;
    }

    searchSessions(searchTerm: string){
        this._eventService.findSessions(searchTerm)
            .subscribe( (sessions: ISession[]) => {
                this.foundSessions = sessions;
            });
    }

    logout(){
        this._authService.logout()
            .catch(error => {
                this.toastr.error('No se pudo deslogear', 'Error');
                this._router.navigate(['/404']);
                return error;
            })
            .subscribe( () => {
                this.toastr.success('User has logged out', 'Success');
                this._router.navigate(['/events']);
            });

    }

}