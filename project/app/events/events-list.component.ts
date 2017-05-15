// import { EventListResolver } from './events-list-resolver.service';
import { ActivatedRoute } from '@angular/router';
// import { ToastrService } from './../common/toastr.service';
import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { IEvent } from './shared/barrel.index';

@Component({
    moduleId: module.id,
    selector: 'events-list',
    template: `
      <div>
          <h1>Upcoming Angular 2 Events</h1>
          <hr/>
          <div class="row">
              <div class="col-md-5" *ngFor="let ev of events">
                  <event-thumbnail [event]="ev" (eventClick)="handleEventClicked($event)"></event-thumbnail>
              </div>
          </div> 
      </div>
    `   //antes teniamos un (click)="handleThumnailClicked(ev.name)" en event-thumnail

})
export class EventsListComponent implements OnInit{

 events: IEvent[];

 constructor(private _eventService: EventService,
            //  private _toastr: ToastrService,
             private _activatedRoute: ActivatedRoute){}

 ngOnInit(){

    //  this._eventService.getEvents().subscribe(
    //      events => this.events = events
    //  );

    //!> Ya no hace falta hacer lo de arriba porque usamos un Resolver, en este caso
    //      en la ruta se especifica usar EventsListResolver para precargar datos antes.

    //!> ahora es conveniente usar el data propertie 'events' obtenido del EventListResolver
    //!> se usa tambien el resolver para que no se visualize la RUTA hasta que los datos
    //!     esten cargados!
    this.events = this._activatedRoute.snapshot.data['events'];

 }

 /**
  * Esta funcion recibe un dato emitido desde un nested component, o sea, emitido mediante un
  * EventEmitter<>.
  */
 handleEventClicked(eventData){
    console.log('received: ' + eventData);
 }

//  handleThumnailClicked(eventName: string){
//    this._toastr.succes("Would you go to the " + eventName + " event?", "Hi");
//  }

}