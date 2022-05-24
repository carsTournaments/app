import { Round, Pairing, Car, Tournament } from '@models';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImagePipe } from '@pipes';
import { TournamentItemComponent } from './tournament-item.component';
import { SharedModule } from '@shared/shared.module';

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
                SharedModule,
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
