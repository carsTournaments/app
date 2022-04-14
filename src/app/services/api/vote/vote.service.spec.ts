import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { StorageService, VoteService } from '../..';
import { Inscription } from 'src/app/models';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';
import { ServicesModule } from '../../services.module';

const paginator: PaginatorI = {
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
    total: 0,
};

const item = new Inscription();
const res = {
    items: [item],
    paginator,
};

fdescribe('VoteService', () => {
    let httpTestingController: HttpTestingController;
    let service: VoteService;
    const storageService = jasmine.createSpyObj('StorageService', ['clear']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                VoteService,
                {
                    provider: StorageService,
                    useValue: storageService,
                },
            ],
            imports: [HttpClientTestingModule, ServicesModule],
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
});
