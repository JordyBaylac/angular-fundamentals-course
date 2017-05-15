import { JQUERY_OPAQUE_TOKEN } from './jQuery.service';
import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit{

    element: HTMLElement;
    @Input('modal-trigger') modalId: string; //aqui se lee el valor que recibe la directiva entre comillas

    constructor(
        element: ElementRef,
        @Inject(JQUERY_OPAQUE_TOKEN) private $: any
    ){
        this.element = element.nativeElement;
    }

    ngOnInit(){
        this.element.addEventListener('click', () => {
            this.$(`#${this.modalId}`).modal({});
        });
    }

}