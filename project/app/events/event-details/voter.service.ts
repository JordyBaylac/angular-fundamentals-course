import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ISession } from './../shared/session.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VoterService{

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private _http: Http){}

    deleteVoterOnSession(eventId, session: ISession, userName: string): Observable<ISession>{

        session.voters = session.voters.filter(voter => voter !== userName.toLocaleLowerCase());

        //! via 1 con server
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${userName.toLocaleLowerCase()}`;

        return this._http.delete(url)
                    .map( (response: Response) => {
                        return response.json() as ISession;
        }).catch(this.handleError);
        //! via 2
        // let voterIndex = session.voters.indexOf(userName.toLocaleLowerCase());
		// if (voterIndex != -1) {
        //     console.log('delete voter at index ' + voterIndex + ':', session.voters[voterIndex])
        //     session.voters.splice(voterIndex, 1);
		// }

        //! via 3
        // let usarNameLower = userName.toLocaleLowerCase()
        // session.voters = session.voters.filter(voter => voter!==usarNameLower)
    }

    addVoterOnSession(eventId, session: ISession, userName: string){

        //! via con server
        let requestOptions = new RequestOptions({headers: this.headers});
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${userName.toLocaleLowerCase()}`;

        return this._http.post(url, {}, requestOptions)
                    .map( (response: Response) => {
                        return response.json() as ISession;
        }).catch(this.handleError);

        //! via anterior
        // session.voters.push(userName.toLocaleLowerCase());
    }

    userHasVotedOnSession(session: ISession, userName: string): boolean {
        return session.voters
				.some(voter => voter === userName.toLocaleLowerCase());

    }

    private handleError(error: Response){
      return Observable.throw(error.statusText);
    }

}