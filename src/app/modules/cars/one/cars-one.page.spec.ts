import { ImagePipe } from 'src/app/pipes';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ComponentsModule } from 'src/app';
import { CarService, BrandService } from 'src/app/services';
import { Brand, Car } from 'src/app/models';
import { CarsOnePage } from './cars-one.page';
import { ActivatedRoute } from '@angular/router';

describe('CarsOnePage', () => {
    let component: CarsOnePage;
    let fixture: ComponentFixture<CarsOnePage>;
    let carService: CarService;
    let navCtrl: NavController;
    let route: ActivatedRoute;
    let imagePipe: ImagePipe;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CarsOnePage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                ComponentsModule,
            ],
            providers: [
                CarService,
                ImagePipe,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => '1',
                            },
                        },
                    },
                },
            ],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(CarsOnePage);
        component = fixture.componentInstance;
        carService = testbed.inject(CarService);
        route = testbed.inject(ActivatedRoute);
        imagePipe = testbed.inject(ImagePipe);

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit', () => {
        spyOn(component, 'getOne');
        component.ngOnInit();
        expect(component.vm.id).toBe('1');
        expect(component.getOne).toHaveBeenCalled();
    });

    describe('getOne', () => {
        const car = new Car();
        car._id = '1';
        it('success', () => {
            spyOn(carService, 'getOne').and.returnValue(of(car));
            component.getOne();
            expect(component.vm.car._id).toBe('1');
            expect(component.vm.image).toBe('assets/no-image.png');
        });
    });

    it('segmentChanged', () => {
        component.segmentChanged({ detail: { value: 0 } });
        expect(component.vm.header.segments.selected).toBe(0);
    });
});
