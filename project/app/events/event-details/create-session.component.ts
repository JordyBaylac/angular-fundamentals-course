
import { Router } from '@angular/router';
import { ISession, restrictedWords } from '../shared/barrel.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'create-session',
    templateUrl: 'create-session.component.html',
    styles: [`
        em {
            float: right;
            color: #e05c65;
            padding-left:10px;
        }
        .error input, .error select, .error textarea { background-color: #e3c3c5; }
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :-moz-placeholder { color: #999; }
        .error :ms-input-placeholder { color: #999; }
    `]
})
export class CreateSessionComponent implements OnInit{

    sessionForm: FormGroup;
    sessionName: FormControl;
    presenter  : FormControl;
    duration   : FormControl;
    level      : FormControl;
    abstract   : FormControl;

    @Output()
    onSaveEvent = new EventEmitter<ISession>();

    @Output()
    onCancelEvent = new EventEmitter();

    constructor(private _router: Router){}

    ngOnInit(){

        this.sessionName = new FormControl('', Validators.required);
        this.presenter  = new FormControl('', Validators.required);
        this.duration   = new FormControl('', Validators.required);
        this.level      = new FormControl('', Validators.required);
        this.abstract   = new FormControl('', [Validators.required,
                                               Validators.maxLength(400),
                                               restrictedWords(['foo', 'bar'])]);

        this.sessionForm = new FormGroup({
            sessionName:    this.sessionName,
            presenter:      this.presenter,
            duration:       this.duration,
            level:          this.level,
            abstract:       this.abstract
        });


    }



    save(formValues){
        let session: ISession = {
            id: undefined,
            name: formValues.sessionName,
            presenter: formValues.presenter,
            duration: +formValues.duration,
            level: formValues.level,
            abstract: formValues.abstract,
            voters: []
        };
        this.onSaveEvent.emit(session);
    }

    redirect(){
        // this._router.navigate(['events']);
        console.log('emitiendo!');
        this.onCancelEvent.emit();
    }

}