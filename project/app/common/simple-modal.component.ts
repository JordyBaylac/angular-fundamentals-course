import { JQUERY_OPAQUE_TOKEN } from './jQuery.service';
import { Component, Input, ElementRef, ViewChild, Inject } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'simple-modal',
    templateUrl: 'simple-modal.component.html',
    styles: [`
        .modal-body {
            height: 20em;
            overflow-y: scroll;
        }
    `]

})
export class SimpleModalComponent{
    @Input()
    title: string;

    @Input()
    elementId: string;

    @ViewChild('modalContainer') containerEl: ElementRef;

    constructor( @Inject(JQUERY_OPAQUE_TOKEN) private $: any ){

    }

    closeModal(){
            this.$(this.containerEl.nativeElement).modal('hide');
    }

}