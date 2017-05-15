import { Observable } from 'rxjs/Observable';

import {
    IEvent,
    EventService
} from './shared/barrel.index';

import { Injectable,  } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class EventListResolver implements Resolve<IEvent[]>{

    constructor( private _eventService: EventService ){}

    //! Esto devuelve un observable que es suscrito para cargar y devolver los eventos.
    resolve(route: ActivatedRouteSnapshot,
            snapshot: RouterStateSnapshot
            ): Observable<IEvent[]> {

        return this._eventService.getEvents();

    }

}