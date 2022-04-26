import { Round, Pairing, Car, Tournament } from 'src/app/models';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ImagePipe } from 'src/app/pipes';
import { TournamentItemComponent } from './tournament-item.component';

const tournament = new Tournament({
    _id: '123',
    name: 'prueba',
    status: 'Todo',
    startDate: '',
    endDate: '',
    info: '',
    requisites: [],
    maxParticipants: 0,
});

describe('CarItemComponent', () => {
    let component: TournamentItemComponent;
    let fixture: ComponentFixture<TournamentItemComponent>;

    const imagePipe = jasmine.createSpyObj('ImagePipe', ['transform']);
    imagePipe.transform.and.returnValue('url');
    const navCtrl = jasmine.createSpyObj('NavController', ['navigateForward']);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TournamentItemComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                PipesModule,
            ],
            providers: [{ provide: ImagePipe, useValue: imagePipe }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = testbed.createComponent(TournamentItemComponent);
        component = fixture.componentInstance;
        component.tournament = tournament;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
