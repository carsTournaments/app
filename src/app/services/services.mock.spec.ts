export const popoverCtrl = jasmine.createSpyObj('PopoverController', [
    'create',
]);

export const alertService = jasmine.createSpyObj('AlertService', [
    'presentAlert',
    'presentAlertWithButtons',
]);
export const authService = jasmine.createSpyObj('AuthService', [
    'login',
    'getUser',
    'setToken',
    'getToken',
]);

export const brandService = jasmine.createSpyObj('BrandService', ['getAll']);

export const carService = jasmine.createSpyObj('CarService', [
    'getAllOfDriver',
    'getOne',
    'create',
    'update',
    'delete',
]);

export const imageService = jasmine.createSpyObj('ImageService', [
    'addNewToGallery',
]);

export const navCtrl = jasmine.createSpyObj('NavController', [
    'navigateForward',
    'navigateBack',
]);

export const utilsService = jasmine.createSpyObj('UtilsService', [
    'reloadPage',
]);
