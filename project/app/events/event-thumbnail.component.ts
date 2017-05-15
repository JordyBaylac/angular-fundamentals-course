
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from './shared/barrel.index';

@Component({
    moduleId: module.id,
    selector: 'event-thumbnail',
    templateUrl: 'event-thumbnail.component.html',
    styles: [`
        .blue { color: blue !important; }
        .red { color: red !important; }
        .green { color: green !important; }
        .bold { font-weight: bold; }
        .thumbnail { min-height: 210px; }
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb; }
    `
    ]
})
export class EventThumbnailComponent {

    @Input()
    event: IEvent;

    @Output()
    eventClick = new EventEmitter();

    handleClickMe(): void {
        this.eventClick.emit('foo');
    }

    /**
     * Esto es una funcion que uso en ngClass para establecer clases a un elemento
     * Se usa [ngClass]="stylePrice()" en este caso
     *  la funcion puede devolver:
     *      - un objeto con los key siendo las clases y los valores expresiones booleanas
     *      - un array de string con las clases a aplicar
     *      - un string con la clase a aplicar, solo una en este caso!
     */
    stylePrice(): any {
        if (this.event.price > 699 && this.event.price < 899)
            return 'blue';
        if (this.event.price <= 699)
            return ['bold', 'red'];
        return {bold: this.event.price == 950};
    }

    setStyleForName(): any{
        if (this.event.name == 'ng-nl')
            return { 'font-weight': 'bold' };
        return {};
    }
}