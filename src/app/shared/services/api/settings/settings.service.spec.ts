import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdmobService, AlertService, SettingsService, StorageService } from '@services';
import { Like } from '@models';
import { admobService, alertService, storageService } from '@services/services.mock.spec';

const item = new Like();

describe('SettingsService', () => {
  let httpTestingController: HttpTestingController;
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsService,
        { provide: StorageService, useValue: storageService },
        { provide: AlertService, useValue: alertService },
        { provide: AdmobService, useValue: admobService },
      ],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SettingsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSettings in storage', async () => {
    const settings: any = {}
    storageService.get = jasmine.createSpy().and.returnValue(settings);
    const data = await service.getSettings();
    expect(data).toEqual(settings);
  })

  // fit('getSettings not in storage', async () => {
  //   spyOn(service, 'getSettingsDB');
  //   spyOn(service, 'getSettings');
  //   storageService.get = jasmine.createSpy().and.returnValue(undefined);
  //   const data = await service.getSettings();
  //   console.log(data);
  //   expect(service.getSettingsDB).toHaveBeenCalled();
  // })
});
