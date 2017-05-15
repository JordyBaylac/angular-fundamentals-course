import { Http, Headers, RequestOptions } from '@angular/http';
import { IUser } from './user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

    currentUser: IUser;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private _http: Http){}

    loginUser(userName: string, password: string){


        let requestOptions = new RequestOptions({headers: this.headers});

        let loginInfo = { username: userName, password: password };

        return this._http.post('/api/login', loginInfo, requestOptions)
                    .do( resp => {
                        if (resp){
                            // !> el parametro user es especifico a la respuesta desde el servidor
                            this.currentUser = <IUser>resp.json().user; 
                        }
                    }).catch( error => {
                        return Observable.of(false);
                    });

    }

    isAuthenticated(): boolean {
        return !!this.currentUser;
    }

    checkAuthenticationStatus(){
        this._http.get('/api/currentIdentity')
            .map((resp: any) => {
                if (resp._body){ // !> este parametro no esta definido en el objeto response
                                //      pero existe, y se refiere a la respuesta del response
                    return resp.json();
                } else {
                    return {};
                }
            })
            .do(currentUser => {
                if (!!currentUser.userName){
                    console.log('habia un usuario logeado');
                    this.currentUser = currentUser;
                } else {
                    console.log('no hay ningun usuario logeado');
                }
            })
            .subscribe();
    }

    updateCurrentUser(firstName: string, lastName: string): Observable<IUser>{


        let requestOptions = new RequestOptions({headers: this.headers});
        let updateInfo = {
            firstName: firstName,
            lastName: lastName
        };

        return this._http.put(`/api/users/${this.currentUser.id}`, updateInfo, requestOptions)
            .map( res => {
                this.currentUser.firstName = firstName;
                this.currentUser.lastName = lastName;
                return res.json() as IUser;
            });
    }

    logout(): Observable<any> {
        if (this.isAuthenticated()){
            console.log('trying to logout');
            this.currentUser = undefined;
            return this._http.post('/api/logout', {});
        }
        return Observable.throw('impossible logout!');
    }

}
