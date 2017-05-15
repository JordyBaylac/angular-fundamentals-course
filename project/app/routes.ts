// import { EventListResolver } from './events/events-list-resolver.service';
// import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { Error404Component } from './errors/error-404.component';
// import { CreateEventComponent } from './events/create-event.component';
// import { EventDetailsComponent } from './events/event-details/event-details.component';
// import { EventsListComponent } from './events/events-list.component';
import { Routes } from '@angular/router';
import { EventResolver } from './events/event-resolver.service';

import {

    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver,
    CreateSessionComponent

} from './events/barrel.index';


export const appRoutes: Routes = [
    { path: 'events', component: EventsListComponent, resolve: {events: EventListResolver}},
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
    { path: 'events/session/new', component: CreateSessionComponent},
    { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator], resolve: {event: EventResolver} },

    // !> esto de abajo es para dirigir un path hacia un manejador de rutas que
    // !     es tratado por un child. Es util para hacer lazyLoading de modulos.
    { path: 'user', loadChildren: 'app/user/user.module#UserModule'},

    { path: '404', component: Error404Component },
    { path: '', redirectTo: 'events', pathMatch: 'full'},
    { path: '**', redirectTo: 'events' }

];
