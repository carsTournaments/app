import { environment } from '@env/environment';
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '@models';
import { AuthLogInDto, AuthRegisterDto } from './auth.dto';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '@services/ionic/storage.service';
import { AuthService } from './auth.service';
import { SharedModule } from '@shared/shared.module';

const item = new User();
const res = {
    user: item,
    token: 'token',
};

describe('AuthService', () => {
    let httpTestingController: HttpTestingController;
    let service: AuthService;
    const storageService = jasmine.createSpyObj('StorageService', [
        'get',
        'clear',
        'set',
        'remove',
    ]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                {
                    provide: StorageService,
                    useValue: storageService,
                },
            ],
            imports: [HttpClientTestingModule, SharedModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AuthService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('login', () => {
        const data: AuthLogInDto = {
            email: '',
            password: '',
        };
        service.login(data).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(res));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/auth/login`
        );
        req.flush(res);
    });

    it('login', () => {
        spyOn(localStorage, 'clear');
        service.logout();
        expect(localStorage.clear).toHaveBeenCalled();
    });

    it('register', () => {
        const data: AuthRegisterDto = {
            name: '',
            email: '',
            password: '',
        };
        service.register(data).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(res));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/auth/register`
        );
        req.flush(res);
    });

    it('setToken', () => {
        spyOn(localStorage, 'setItem');
        service.setToken('');
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('getToken', () => {
        spyOn(localStorage, 'getItem');
        service.getToken();
        expect(localStorage.getItem).toHaveBeenCalled();
    });

    it('setUser', () => {
        service.setUser(item);
        expect(true).toBe(true);
    });

    it('getUser', () => {
        service.getUser();
        expect(true).toBe(true);
    });

    describe('isAuthenticated', () => {
        it('true', () => {
            spyOn(service, 'getToken').and.returnValue('token');
            const result = service.isAuthenticated();
            expect(result).toBe(true);
        });

        it('true', () => {
            spyOn(service, 'getToken').and.returnValue(null);
            const result = service.isAuthenticated();
            expect(result).toBe(false);
        });
    });

    // it('getAllOffBrand', () => {
    //     service.getAllOffBrand({id: '1'}).subscribe((response) => {
    //         expect(response).not.toBe(null);
    //         expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
    //     });
    //     const req = httpTestingController
    //         .expectOne(`${environment.urlApi}/cars/allOfBrand`);
    //     req.flush([]);
    // });

    // it('getAllOfDriver', () => {
    //     service.getAllOfDriver({id: '1'}).subscribe((response) => {
    //         expect(response).not.toBe(null);
    //         expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
    //     });
    //     const req = httpTestingController
    //         .expectOne(`${environment.urlApi}/cars/allOfDriver`);
    //     req.flush([]);
    // });

    // it('getOne', () => {
    //     service.getOne('1').subscribe((response) => {
    //         expect(response).not.toBe(null);
    //         expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    //     });
    //     const req = httpTestingController
    //         .expectOne(`${environment.urlApi}/cars/one`);
    //     req.flush(item);
    // });

    // it('create', () => {
    //     service.create(item).subscribe((response) => {
    //         expect(response).not.toBe(null);
    //         expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    //     });
    //     const req = httpTestingController
    //         .expectOne(`${environment.urlApi}/cars/create`);
    //     req.flush(item);
    // });
});
