export const authService = jasmine.createSpyObj('AuthService', [
  'login',
  'logout',
  'getUser',
  'setToken',
  'getToken',
  'isAuthenticated',
]);
export const brandService = jasmine.createSpyObj('BrandService', [
  'getAll',
  'getAllBrandsAndCars',
]);

export const carService = jasmine.createSpyObj('CarService', [
  'getAll',
  'getAllDriverCars',
  'getGlobalRanking',
  'getOne',
  'create',
  'update',
  'delete',
]);

export const imageService = jasmine.createSpyObj('ImageService', [
  'addNewToGallery',
  'update',
  'openImage',
  'setFirstImage',
  'deleteOne',
]);

export const likeService = jasmine.createSpyObj('LikeService', [
  'checkLikedStorage',
]);

export const inscriptionService = jasmine.createSpyObj('InscriptionService', [
  'getAllTournamentInscriptions',
  'getAllCarInscriptions',
  'getAllDriverInscriptions',
  'getMyCarsForInscription',
  'getOne',
]);

export const tournamentService = jasmine.createSpyObj('TournamentService', [
  'getAllOfAllStates',
  'delete',
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
  'set',
  'get',
]);

export const location = jasmine.createSpyObj('Location', [
  'isCurrentPathEqualTo',
]);

// Varios
export const analyticsService = jasmine.createSpyObj('AnalyticsService', [
  'start',
  'initFb',
  'logEvent',
]);

export const utilsService = jasmine.createSpyObj('UtilsService', [
  'reloadPage',
]);

export const toggleService = jasmine.createSpyObj('ToggleService', [
  'getToggle',
  'setToggle',
]);

export const translateService = jasmine.createSpyObj('TranslateService', [
  'get',
  'instant',
]);

export const actionSheetService = jasmine.createSpyObj(
  'ActionSheetIonicService',
  ['present']
);
actionSheetService.present = jasmine.createSpy().and.returnValue(
  Promise.resolve({
    present: (): Promise<void> => Promise.resolve(),
    onDidDismiss: () =>
      Promise.resolve({
        data: {
          data: {},
        },
      }),
  })
);

export const userService = jasmine.createSpyObj('UserService', ['getUser']);

export const admobService = jasmine.createSpyObj('AdmobService', ['init']);

export const toastIonicService = jasmine.createSpyObj('ToastIonicService', [
  'info',
  'error',
]);

export const platform = jasmine.createSpyObj('Platform', ['is']);

export const reportService = jasmine.createSpyObj('ReportService', ['create']);
export const modalCtrl = jasmine.createSpyObj('ModalController', [
  'create',
  'dismiss',
]);
