import './rxjs-imports';
import { EventResolver } from './events/event-resolver.service';
import { VoterService } from './events/event-details/voter.service';
// import { UpvoteComponent } from './events/event-details/upvote.component';
import { ModalTriggerDirective } from './common/modal-trigger.directive';
import { SimpleModalComponent } from './common/simple-modal.component';
import { JQUERY_OPAQUE_TOKEN } from './common/jQuery.service';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
// import { CreateSessionComponent } from './events/event-details/create-session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './user/auth.service';
// import { UserModule } from './user/user.module';
// import { EventListResolver } from './events/events-list-resolver.service';
// import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { Error404Component } from './errors/error-404.component';
// import { CreateEventComponent } from './events/create-event.component';
import { appRoutes } from './routes';
import { HttpModule } from '@angular/http';

// !> Esto de abajo se usa para organizar imports,
//      En un fichero se exporta todo lo de una carpeta, y cada subcarpeta
//         tiene su fichero en donde se exportan sus cosas
//      Asi se importa un fichero en donde se pueden importar varias cosas relacionadas
//         sin necesidad de varios imports con rutas a ficheros
import {

    EventService,
    EventsListComponent,
    EventDetailsComponent,
    EventThumbnailComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent,
    SessionDurationPipe,
    UpvoteComponent,
    LocationValidatorDirective

} from './events/barrel.index';

// import { EventDetailsComponent } from './events/event-details/event-details.component';
import { TOASTR_OPAQUE_TOKEN } from './common/toastr.service';
// import { EventService } from './events/shared/event.service';
import { BrowserModule } from '@angular/platform-browser';
import { EventAppComponent } from './event-app.component';
// import { EventThumbnailComponent } from './events/event-thumbnail.component';
// import { EventsListComponent } from './events/events-list.component';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav/navbar.component';
import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


// ! declarando variable global toastr
declare let toastr: any; // aqui podiamos haber tipado con Toastr pero no tiene sentido
declare let jQuery: Object;

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        // UserModule
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    declarations: [
        EventAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        SessionDurationPipe,
        SimpleModalComponent,
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidatorDirective
    ],
    providers: [
        EventService,
        { provide: TOASTR_OPAQUE_TOKEN, useValue: toastr},
        { provide: JQUERY_OPAQUE_TOKEN, useValue: jQuery},
        EventRouteActivator,
        {
            provide: 'canDeactivateCreateEvent', useValue: checkDirtyState
        },
        EventListResolver,
        AuthService,
        VoterService,
        EventResolver
    ],
    bootstrap: [EventAppComponent]
})
export class AppModule { }

function checkDirtyState(event: CreateEventComponent, activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot){
    if (event.isDirty) {
        alert('Event is Dirty to redirect');
        return false;
    }
    return true;

}
