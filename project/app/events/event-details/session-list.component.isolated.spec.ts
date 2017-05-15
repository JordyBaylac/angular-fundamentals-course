import { ISession } from './../shared/session.model';
import { SessionListComponent } from './session-list.component';

describe('SessionListComponent', () => {

    let _component: SessionListComponent,
        _mockAuthService,
        _mockVoterService;

    //! para no mutar el estado de un test a otro, se inicializa _voterService nuevamente antes de cada uno
    beforeEach(() => {
        _mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
        _mockVoterService = jasmine.createSpyObj('VoterService', ['addVoterOnSession', 'deleteVoterOnSession', 'userHasVotedOnSession']);

        _component = new SessionListComponent(_mockAuthService, null, _mockVoterService);
    });

    describe('ngOnChanges', () => {

        it('should filter the sessions correctly', () => {

            //arrangement
            _component.sessions = <ISession[]> [
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 2', level: 'intermediate'},
                {name: 'session 3', level: 'beginner'}
            ];

            _component.filterBy = 'intermediate';

            //act
            _component.ngOnChanges();

            //assert
            expect(_component.visibleSessions.length).toBe(2);
            expect(_component.visibleSessions.map(s => s.name)).not.toContain('session 3');
        });

        it('should sort the sessions correctly', () => {

            //arrangement
            _component.sessions = <ISession[]> [
                {name: 'session B', level: 'intermediate'},
                {name: 'session C', level: 'intermediate'},
                {name: 'session A', level: 'beginner'}
            ];

            _component.sortBy = 'name';

            //act
            _component.ngOnChanges();

            //assert
            expect(_component.visibleSessions[0].name).toBe('session A');
            expect(_component.visibleSessions[1].name).toBe('session B');
            expect(_component.visibleSessions[2].name).toBe('session C');

        });

    });

});