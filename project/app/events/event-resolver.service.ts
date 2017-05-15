import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IEvent } from './shared/event.model';
import { Injectable } from '@angular/core';
import { EventService } from './shared/event.service';

@Injectable()
export class EventResolver implements Resolve<IEvent>{

    constructor(private _eventService: EventService){}

    resolve(activatedRoute: ActivatedRouteSnapshot,
            snapshot: RouterStateSnapshot,
            ): IEvent {


        //! este preload_event lo cargamos antes en la Guard 'canActivate'.
        console.log('checking preload_event?', activatedRoute['preload_event']);
        return activatedRoute['preload_event'];
        // return this._eventService.getEvent(+activatedRoute.params['id']);

    }

}