// import { ISession } from './../shared/session.model';
import { SessionDurationPipe } from './session-duration.pipe';
import { VoterService } from './voter.service';
import { SessionListComponent } from './session-list.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { By } from '@angular/platform-browser';
import { JQUERY_OPAQUE_TOKEN } from '../../common/jQuery.service';


describe('SessionListComponent', () => {

    let fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement;

    beforeEach(async(() => {

        let mockAuthService = {
                isAuthenticated: () => true,
                currentUser: {
                    userName: 'Joe'
                }
            };
        let mockVoterService = {
            userHasVotedOnSession: (ISession, string) => true
        };
        let mockjQuery = {};


        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                // UpvoteComponent, //! si los comento da error, porque se necesitan
                // CollapsibleWellComponent, //! pero si se agrega el schema NO_ERRORS_SCHEMA se ingoran
                SessionDurationPipe
            ],
            providers: [
                {provide: AuthService, useValue: mockAuthService},
                {provide: VoterService, useValue: mockVoterService},
                {provide: JQUERY_OPAQUE_TOKEN, useValue: mockjQuery},
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents(); //innecesary with webpack, jut with systemJS

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        debugEl = fixture.debugElement;
    });

    it('should have the correct session title', () => {

        component.sessions = [{
            id: 3, name: 'Session 1', presenter: 'Joe',
            duration: 1, level: 'beginner', abstract: 'abstract 1',
            voters: ['john', 'bob']
        }];
        component.filterBy = 'all';
        component.sortBy = 'name';
        component.eventId = 4;

        component.ngOnChanges(); //su fuera ngOnInit no hace falta llamarlo

        fixture.detectChanges();

        //using the element
        expect(element.querySelector('[well-title]').textContent).toContain('Session 1');

        //using the debug element
        expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');

    });

});