import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { ImageService } from '../..';
import { Inscription } from '@models';
import { Photo, Camera } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

// const paginator: PaginatorI = {
//     pageSize: 0,
//     currentPage: 0,
//     totalPages: 0,
//     total: 0,
// };

const item = new Inscription();
// const res = {
//     items: [item],
//     paginator,
// };

describe('ImageService', () => {
    let httpTestingController: HttpTestingController;
    let service: ImageService;
    const modalCtrl = jasmine.createSpyObj('ModalController', ['create']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ImageService,
                { provide: ModalController, useValue: modalCtrl },
            ],
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(ImageService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    xit('addNewToGallery', async () => {
        spyOn(service, 'upload');
        spyOn(service, 'b64toBlob').and.returnValue(new Blob());
        const photoMock: Photo = {
            format: 'jpeg',
            saved: true,
            base64String: '',
        };
        spyOn(Camera, 'getPhoto').and.returnValue(Promise.resolve(photoMock));
        await service.addNewToGallery('car', '1');
    });
});
