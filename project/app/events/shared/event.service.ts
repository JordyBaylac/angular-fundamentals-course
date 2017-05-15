import { ISession } from './session.model';
import { IEvent } from './event.model';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/Rx';
/**
 *
 *
 * @export
 * @class EventService
 */
@Injectable()
export class EventService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private _http: Http){

    }

    /**
     *
     *
     * @returns {Observable<IEvent[]>}
     *
     * @memberOf EventService
     */
    getEvents(): Observable<IEvent[]>{
        return this._http.get('/api/events').map((response: Response) => {
          //return <IEvent[]>response.json(); //! via 1
          return response.json() as IEvent[];
        }).catch(this.handleError);
    }

    /**
     *
     *
     * @param {number} id
     * @returns {Observable<IEvent>}
     *
     * @memberOf EventService
     */
    getEvent(id: number): Observable<IEvent>{

      return this._http.get(`/api/events/${id}`).map((response: Response) => {
          //return <IEvent[]>response.json(); //! via 1
          return response.json() as IEvent;
      });

      //! Anteriormente se hacia lo de abajo, con datos locales!
      // return new Observable<IEvent>( (observer) => {

      //   let event: IEvent = EVENTS.find( (ev: IEvent) => ev.id === id)
      //   if((!!event))
      //     observer.next(event);
      //   observer.complete();
      // });
    }

    /**
     *
     *
     * @param {IEvent} event
     *
     * @memberOf EventService
     */
    saveEvent(event: IEvent): Observable<IEvent>{

      let requestOptions = new RequestOptions({headers: this.headers});

      return this._http.post('/api/events', event, requestOptions)
                       .map((response: Response) => {
          //return <IEvent[]>response.json(); //! via 1
          return response.json() as IEvent;  //! via 2
      }).catch(this.handleError);

      // event.id = 999;
      // event.sessions = [];
      // EVENTS.push(event);
    }

    /**
     * Actualiza un evento. El id se mantiene
     *
     * @param {IEvent} event
     *
     * @memberOf EventService
     */
    updateEvent(event: IEvent): Observable<IEvent>{

      // let index = EVENTS.findIndex(ev => ev.id == event.id);
      // EVENTS[index]=event;
      return this.saveEvent(event);
    }

    findSessions(searchTerm: string): Observable<ISession[]> {


      //! via con backend
      let requestOptions = new RequestOptions({headers: this.headers});
      return this._http.get(`/api/sessions/search?search=${searchTerm}`, requestOptions)
                       .map((response: Response) => {
                         console.log('llamada a backend searchSession done!');
                         return response.json() as ISession[];  //! via 2
      }).catch(this.handleError);

      //! via local anteriormente usada
      // searchTerm = searchTerm.toLocaleLowerCase()
      // return new Observable<ISession[]>( (observer: Subscriber<ISession[]>) => {

      //   let sessions: ISession[] = []

      //   EVENTS.forEach( (ev: IEvent) => {
      //     ev.sessions.forEach( (se: any) => {

      //       if(se.name.toLocaleLowerCase().includes(searchTerm) ||
      //         se.abstract.toLocaleLowerCase().includes(searchTerm) ||
      //         se.presenter.toLocaleLowerCase().includes(searchTerm) ||
      //         se.level.toLocaleLowerCase().includes(searchTerm)){
      //           se.eventId = ev.id;
      //           sessions.push(se);
      //         }

      //     });
      //   });
      //   observer.next(sessions);
      //   observer.complete();
      // });
    }

    private handleError(error: Response){
      return Observable.throw(error.statusText);
    }

}
