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
import { ViewerComponent } from './viewer.component';
import { IonicModule } from '@ionic/angular';

describe('CarItemComponent', () => {
    let component: ViewerComponent;
    let fixture: ComponentFixture<ViewerComponent>;

    const imagePipe = jasmine.createSpyObj('ImagePipe', ['transform']);
    imagePipe.transform.and.returnValue('url');

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ViewerComponent],
            imports: [
                IonicModule,
                RouterTestingModule,
                HttpClientTestingModule,
                PipesModule,
            ],
            providers: [{ provide: ImagePipe, useValue: imagePipe }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = testbed.createComponent(ViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('close', () => {
        component.close();
        expect(component.close).toBeTruthy();
    });
});
