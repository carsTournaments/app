import { environment } from '@env/environment';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PairingService } from '../..';
import { Pairing } from '@models';

const item = new Pairing();

describe('PairingService', () => {
  let httpTestingController: HttpTestingController;
  let service: PairingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PairingService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PairingService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getOne', () => {
    service.getOne('1').subscribe((response) => {
      expect(response).not.toBe(null);
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/pairings/one`
    );
    req.flush(item);
  });
});
