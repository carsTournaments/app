import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { ReportService } from '../..';
import { Like, Report } from '@models';
import { environment } from '@env/environment';

const item = new Like();

describe('ReportService', () => {
    let httpTestingController: HttpTestingController;
    let service: ReportService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ReportService,
            ],
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(ReportService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

  it('getAllOfRound', () => {
    service.getAllOfRound({ id: '1' }).subscribe((response) => {
      expect(response).not.toBe(null);
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/reports/allOfRound`
    );
    req.flush(item);
  });

  it('getAllOfTournament', () => {
    service.getAllOfTournament({ id: '1' }).subscribe((response) => {
      expect(response).not.toBe(null);
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/reports/allOfTournament`
    );
    req.flush(item);
  })

  it('create', () => {
    const report = new Report();
    service.create(report).subscribe((response) => {
      expect(response).not.toBe(null);
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/reports/create`
    );
    req.flush(item);
  });


});
