import { IEvent } from './shared/event.model';
import { EventService } from './shared/barrel.index';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'create-event.component.html',
    styles: [`
        em {
            float: right;
            color: #e05c65;
            padding-left:10px;
        }
        .error input { background-color: #e3c3c5; }
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :-moz-placeholder { color: #999; }
        .error :ms-input-placeholder { color: #999; }
    `]
})
export class CreateEventComponent{

    /**
     * Indica si el evento que se quiere crear no ha sido propiamente registrado
     */
    isDirty = false;

    constructor(private _router: Router,
                private _eventService: EventService){

    }

    redirect(){
        this.isDirty = false;
        this._router.navigate(['/events']);
    }

    saveEvent(formValues: IEvent){
        console.log((formValues));
        this._eventService.saveEvent(formValues)
            .subscribe( event => {
                console.log('se salvo el evento con ID:', event.id);
                this.redirect();
            });
    }

}