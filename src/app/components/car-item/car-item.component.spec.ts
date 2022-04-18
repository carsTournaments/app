import { Round, Pairing, Car } from 'src/app/models';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavController } from '@ionic/angular';
import { RoundService } from 'src/app/services';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CarItemComponent } from './car-item.component';
import { ImagePipe } from 'src/app/pipes';

const car = new Car();
car.brand = {
    name: '',
};
car.image = {
    url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
};

describe('CarItemComponent', () => {
    let component: CarItemComponent;
    let fixture: ComponentFixture<CarItemComponent>;

    const imagePipe = jasmine.createSpyObj('ImagePipe', ['transform']);
    imagePipe.transform.and.returnValue('url');
    const navCtrl = jasmine.createSpyObj('NavController', ['navigateForward']);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CarItemComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                PipesModule,
            ],
            providers: [
                { provide: ImagePipe, useValue: imagePipe },
                { provide: NavController, useValue: navCtrl },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = testbed.createComponent(CarItemComponent);
        component = fixture.componentInstance;
        component.car = car;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
