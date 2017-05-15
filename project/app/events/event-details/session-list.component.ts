import { VoterService } from './voter.service';
import { JQUERY_OPAQUE_TOKEN } from './../../common/jQuery.service';
import { AuthService } from './../../user/auth.service';
import { ISession } from '../shared/barrel.index';
import { Component, Input, OnChanges, Inject } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'session-list',
	templateUrl: 'session-list.component.html'
})
export class SessionListComponent implements OnChanges {

	@Input()
	sessions: ISession[];

	visibleSessions: ISession[] = [];

	@Input()
	filterBy: string;

	@Input()
	sortBy: string;

	@Input('event-id') eventId;

	constructor(private _authService: AuthService,
				@Inject(JQUERY_OPAQUE_TOKEN) private $: any,
				private _voterService: VoterService) { }

	ngOnChanges() {

		if (this.sessions) {

			if (this.filterBy) {
				this.filterSessions(this.filterBy);
			}
			else{
				this.visibleSessions = this.sessions.slice(0);
			}

			if (this.sortBy) {
				this.sortSessions(this.sortBy);
			}
		}

	}

	filterSessions(filter) {
		if (filter === 'all')
			this.visibleSessions = this.sessions.slice(0);
		else {
			this.visibleSessions = this.sessions.filter(s => {
				return s.level.toLocaleLowerCase() === filter
					? true : false;
			});
		}
	}

	sortSessions(sortBy) {
		if (sortBy === 'name') {
			this.visibleSessions.sort((sa, sb) => {
            return sa.name.localeCompare(sb.name);
			});
		}
		else /*By votes*/ {
			this.visibleSessions.sort((sa, sb) => {
				return sb.voters.length - sa.voters.length;
			});
		}
	}

	toggleVote(session: ISession) {

		if (this._authService.isAuthenticated()) {


			if (this.userHasVoted(session)){
				this._voterService.deleteVoterOnSession(this.eventId, session, this._authService.currentUser.userName)
					.subscribe( res => {
						// session.voters = res.voters;
						this.sortSessions(this.sortBy);
					});
			}
			else {
				this._voterService.addVoterOnSession(this.eventId, session, this._authService.currentUser.userName)
					.subscribe( res => {
						// session.voters = res.voters;
						this.sortSessions(this.sortBy);
					});
			}


		}
		else {
			this.$('[data-toggle="votingTooltip"]').tooltip();
		}



	}

	userHasVoted(session: ISession): boolean {

		if (this._authService.isAuthenticated()) {
			return this._voterService.userHasVotedOnSession(session, this._authService.currentUser.userName);
		}
		else {
			return false;
		}

	}

	userLoggedIn(){
		return this._authService.isAuthenticated();
	}

}