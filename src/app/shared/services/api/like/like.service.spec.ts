import { LikeService } from './like.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StorageService, TournamentService } from '../..';
import { Like } from '@models';
import { environment } from '@env/environment';
import { storageService } from '@services/services.mock.spec';

const item = new Like();

describe('LikeService', () => {
  let httpTestingController: HttpTestingController;
  let service: LikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LikeService,
        { provide: StorageService, useValue: storageService },
      ],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LikeService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll', () => {
    service
      .getAll({ page: 0, pageSize: 20, site: 'app', order: [] })
      .subscribe((response) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
      });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/likes/getAll`
    );
    req.flush(item);
  });

  it('getAllReceivedForUser', () => {
    service.getAllReceivedForUser({ id: '1' }).subscribe((response) => {
      expect(response).not.toBe(null);
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/likes/getAllReceivedForUser`
    );
    req.flush(item);
  });

  it('getAllUserSubmittedLikes', () => {
    service.getAllUserSubmittedLikes({ id: '1' }).subscribe((response) => {
      expect(response).not.toBe(null);
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/likes/getAllUserSubmittedLikes`
    );
    req.flush(item);
  });

  it('getAllCarLikes', () => {
    service.getAllCarLikes({ id: '', limit: '10' }).subscribe((response) => {
      expect(response).not.toBe(null);
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/likes/getAllCarLikes`
    );
    req.flush(item);
  });

  it('create', () => {
    const like = new Like();
    service.create(like).subscribe((response) => {
      expect(response).not.toBe(null);
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/likes/create`
    );
    req.flush(item);
  });

  it('deleteByCarId', () => {
    service.deleteByCarId('1').subscribe((response) => {
      expect(response).not.toBe(null);
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/likes/byCarId/1`
    );
    req.flush(item);
  });
});
