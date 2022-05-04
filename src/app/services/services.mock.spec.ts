export const authService = jasmine.createSpyObj('AuthService', [
    'login',
    'getUser',
    'setToken',
    'getToken',
    'isAuthenticated',
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
export const tournamentService = jasmine.createSpyObj('TournamentService', [
    'getAllOfAllStates',
    'delete',
]);

// Ionic
export const popoverCtrl = jasmine.createSpyObj('PopoverController', [
    'create',
]);

export const alertService = jasmine.createSpyObj('AlertService', [
    'presentAlert',
    'presentAlertWithButtons',
]);
alertService.presentAlertWithButtons = jasmine.createSpy().and.returnValue(
    Promise.resolve({
        present: (): Promise<void> => Promise.resolve(),
        onDidDismiss: () => ({
            data: {
                data: {},
            },
        }),
    })
);

export const navCtrl = jasmine.createSpyObj('NavController', [
    'navigateForward',
    'navigateBack',
]);

export const storageService = jasmine.createSpyObj('StorageService', [
    'startDB',
]);

export const location = jasmine.createSpyObj('Location', [
    'isCurrentPathEqualTo',
]);

// Varios
export const analyticsService = jasmine.createSpyObj('AnalyticsService', [
    'initFb',
    'logEvent',
]);

export const utilsService = jasmine.createSpyObj('UtilsService', [
    'reloadPage',
]);
