import { AuthService } from './../../user/auth.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'upvote',
    moduleId: module.id,
    templateUrl: 'upvote.component.html',
    styleUrls: ['upvote.component.css']
})
export class UpvoteComponent{

    @Input('has-voted') set hasVoted(val: boolean){
        this.iconColor = val ? 'red' : 'white';
    }

    @Input('number-of-votes')
    cantVotes: number;

    @Output()
    vote = new EventEmitter();

    iconColor: string;

    constructor(private _authService: AuthService){}

    raiseVote(){
        this.vote.emit({});
    }

    isThereUserLogged(): boolean{
        return this._authService.isAuthenticated();
    }


}