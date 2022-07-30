import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { AdmobService } from '@services';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  admobService,
  platform,
  toggleService,
} from '@services/services.mock.spec';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { ToggleService } from '@core/services/toggle.service';
import { BrandItemComponent } from '@components';
import { SharedModule } from '@shared/shared.module';
import { Brand } from '@models';

describe('BrandItemComponent', () => {
  let component: BrandItemComponent;
  let fixture: ComponentFixture<BrandItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BrandItemComponent],
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
        { provide: AdmobService, useValue: admobService },
        { provide: Platform, useValue: platform },
        { provide: ToggleService, useValue: toggleService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandItemComponent);
    component = fixture.componentInstance;
    component.brand = new Brand();

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
