import { Input, Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'collapsible-well',
    template: `
        <div class="well pointable" (click)="toggleContent()">
            <h4>
                <ng-content select="[well-title]"></ng-content>
            </h4>
            <ng-content select="[well-body]" *ngIf="visible"></ng-content>
        </div>
    `
})
export class CollapsibleWellComponent{

    @Input()
    title: string;

    visible = true;

    toggleContent(){
        this.visible = !this.visible;
    }

}