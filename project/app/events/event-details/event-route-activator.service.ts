
import { IEvent } from './../shared/barrel.index';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { EventService } from './../shared/event.service';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Response } from '@angular/http';

@Injectable()
export class EventRouteActivator implements CanActivate{

    constructor(private _eventService: EventService,
                private _router: Router){}


    canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {

        return new Observable<boolean>( (observer) => {
            //! verificamos que exista el evento, y lo salvamos para que el resolver ya lo cargue
            //! estos e debe a que los Guard activate se ejecutan primero, asi que se puede guardar
            this._eventService
                .getEvent(+activatedRoute.params['id'])
                .catch( (error: Response) => {
                    this._router.navigate(['/404']);
                    observer.next(false);
                    observer.complete();
                    return Observable.empty();
                })
                .subscribe( (event: IEvent) => {
                    console.log('recibiendo suscrito evento');
                    if (event){
                        console.log('event subscribed gotten:', event);
                        activatedRoute['preload_event'] = event;
                        observer.next(true);
                    }
                    observer.complete();
                });

        });

        //!se devuelve true si la ruta se puede activar

    }

}