import { ISession } from './../shared/session.model';
import { VoterService } from './voter.service';
import { Observable } from 'rxjs/Observable';
import '../../rxjs-imports';

describe('VoterService', () => {

    let _voterService: VoterService,
        _mockHttp;

    //! para no mutar el estado de un test a otro, se inicializa _voterService nuevamente antes de cada uno
    beforeEach(() => {
        _mockHttp = jasmine.createSpyObj('MockHttp', ['delete', 'post']);
        _voterService = new VoterService(_mockHttp);
    });

    describe('deleteVoter', () => {

        it('should remove the voter from the list of voters', () => {

            let session = {id: 4, voters: ['joe', 'john']};
            _mockHttp.delete.and.returnValue(Observable.of(false));

            _voterService.deleteVoterOnSession(3, <ISession>session, 'john');

            // expe
            expect(session.voters.length).toBe(1);
            expect(session.voters).not.toContain('john');

        });

        it('should call http.delete with the rigth URL', () => {

            let session = {id: 4, voters: ['joe', 'john']};
            _mockHttp.delete.and.returnValue(Observable.of(false));
            _voterService.deleteVoterOnSession(3, <ISession>session, 'john');

            expect(_mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/4/voters/john');

        });

    });

    describe('addVoter', () => {

        it('should call http.post with the rigth URL', () => {

            let session = {id: 4, voters: ['joe']};
            _mockHttp.post.and.returnValue(Observable.of(false));

            _voterService.addVoterOnSession(3, <ISession>session, 'john');

            expect(_mockHttp.post)
                .toHaveBeenCalledWith('/api/events/3/sessions/4/voters/john',
                                      {},
                                      jasmine.any(Object));

        });

    });

});