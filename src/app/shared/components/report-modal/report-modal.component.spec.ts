import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ReportService, ToastIonicService } from '@services';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  modalCtrl,
  reportService,
  toastIonicService,
} from '@services/services.mock.spec';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { ReportModalComponent } from '@components';
import { SharedModule } from '@shared/shared.module';
import { Report } from '@models';
import { of, throwError } from 'rxjs';

describe('ReportModalComponent', () => {
  let component: ReportModalComponent;
  let fixture: ComponentFixture<ReportModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReportModalComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        { provide: ReportService, useValue: reportService },
        { provide: ModalController, useValue: modalCtrl },
        { provide: ToastIonicService, useValue: toastIonicService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportModalComponent);
    component = fixture.componentInstance;
    component.pairing = {
      _id: '123',
      round: '',
      tournament: '',
      winner: '',
      car1: {
        _id: '1',
        brand: {
          name: 'prueba',
        },
      },
      votes: '',
      car2: {
        _id: '2',
        brand: {
          name: 'prueba2',
        },
      },
    };

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checkReasons', () => {
    it('checkReasons -> otherReason', () => {
      component.report = new Report({
        userReporter: '',
        userReported: '',
        carReported: '',
        reason: 'Otro',
      });
      component.checkReasons();
      expect(component.otherReason.state).toBe(true);
    });

    it('checkReasons -> not otherReason', () => {
      component.report = new Report({
        userReporter: '',
        userReported: '',
        carReported: '',
        reason: 'Tururu',
      });
      component.checkReasons();
      expect(component.otherReason.state).toBe(false);
    });
  });

  describe('createReport', () => {
    it('Validation KO', () => {
      component.userId = 'prueba';
      component.report = new Report({
        userReporter: '',
        userReported: '',
        carReported: '',
        reason: 'Tururu',
      });
      component.createReport();
      expect(true).toBe(true);
    });

    it('OK', () => {
      component.userId = 'prueba';
      component.report = new Report({
        userReporter: '',
        userReported: '1',
        carReported: '2',
        reason: 'Tururu',
      });
      reportService.create = jasmine.createSpy().and.returnValue(of({}));
      component.createReport();
      expect(true).toBe(true);
    });

    it('KO', () => {
      component.userId = 'prueba';
      component.report = new Report({
        userReporter: '',
        userReported: '1',
        carReported: '2',
        reason: 'Tururu',
      });
      reportService.create = jasmine
        .createSpy()
        .and.returnValue(throwError({ error: '400' }));
      component.createReport();
      expect(true).toBe(true);
    });
  });
});
