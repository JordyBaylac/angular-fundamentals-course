// import { ISession } from './../shared/session.model';
// import { EventService } from './../shared/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ISession, EventService } from '../shared/barrel.index';

@Component({
    moduleId: module.id,
    templateUrl: 'event-details.component.html',
    styles: [`
        .container { padding-left:20px; padding-right:20px; }
        .event-image { height:100px; }
        a { cursor: pointer; }
    `]
})
export class EventDetailsComponent implements OnInit{

    event: IEvent;
    addMode = false;
    filterBy = 'all';
    sortBy = 'votes';

    constructor(private _eventService: EventService,
                private _activatedRoute: ActivatedRoute){}

    ngOnInit(){
        // let id = +this._activeRoute.snapshot.params['id'];
        // console.log('id es:',id);
        // this._activeRoute.params.subscribe((params: Params) => {
        //     this._eventService.getEvent(+params['id'])
        //         .subscribe( (ev: IEvent) => this.event = ev);
        //     this.addMode = false
        //     this.filterBy = 'all'
        //     this.sortBy = 'votes'
        // });
        this._activatedRoute.data.subscribe(data => {
            this.event = data['event'];
            console.log('viewing event:', this.event);
            this.addMode = false;
            this.filterBy = 'all';
            this.sortBy = 'votes';
        });



        // this.event = this._eventService.getEvent(id);


    }

    addSession(){
        this.addMode = true;
    }

    createSession(session: ISession){

        console.log('recibiendo session');
        if (session){
            const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id)) + 1;
            session.id = nextId;
            console.log(session);
            this.event.sessions.push(session);
            this._eventService.updateEvent(this.event)
                    .subscribe(event => {
                        console.log('Se ha guardado la session en el event:', event.name);
                        this.addMode = false;
            });
        }


    }

    cancelCreateSession(){
        this.addMode = false;
    }

}