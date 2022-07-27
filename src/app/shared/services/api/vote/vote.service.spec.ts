import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { Vote } from '@models';
import { environment } from '@env/environment';
import { StorageService } from '@services/ionic/storage-ionic.service';
import { VoteService } from './vote.service';
import { SharedModule } from '@shared/shared.module';

const item = new Vote();
item.pairing = '1';

describe('VoteService', () => {
    let httpTestingController: HttpTestingController;
    let service: VoteService;
    const storageService = jasmine.createSpyObj('StorageService', [
        'get',
        'set',
    ]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                VoteService,
                {
                    provide: StorageService,
                    useValue: storageService,
                },
            ],
            imports: [HttpClientTestingModule, SharedModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(VoteService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getAllOfCar', () => {
        service
            .getAllCarVotes({ id: '1', limit: '10' })
            .subscribe((response) => {
                expect(response).not.toBe(null);
                expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
            });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/votes/getAllOfCar`
        );
        req.flush([]);
    });

    it('getAllOfTournament', () => {
        service.getAllTournamentVotes({ id: '1' }).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/votes/getAllOfTournament`
        );
        req.flush([]);
    });

    it('create', () => {
        service.create(item).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/votes/create`
        );
        req.flush([]);
    });

    it('delete', () => {
        service.delete('1').subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/votes/one/1`
        );
        req.flush([]);
    });

    it('isValidVote', async () => {
        storageService.get = jasmine.createSpy().and.returnValue([item]);
        const vote = new Vote();
        vote.pairing = '1';
        const results = await service.isValidVote(vote);
        expect(results).not.toBeUndefined();
    });

    it('setValidVote', async () => {
        storageService.get = jasmine.createSpy().and.returnValue([item]);
        storageService.set = jasmine.createSpy();
        await service.setValidVote(item);
        expect(true).toBe(true);
    });
});
