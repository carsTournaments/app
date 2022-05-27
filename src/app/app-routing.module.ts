import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'home',
        data: { title: '' },
        loadChildren: () =>
            import('./modules/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'tab',
        loadChildren: () =>
            import('./modules/tabs/tabs.module').then((m) => m.TabsModule),
    },
    {
        path: 'tournament/:id',
        data: { title: 'Torneo' },
        loadChildren: () =>
            import('./modules/tournament/tournament.module').then(
                (m) => m.TournamentModule
            ),
    },
    {
        path: 'car/:id',
        data: { title: 'Coche' },
        loadChildren: () =>
            import('./modules/car/car.module').then((m) => m.CarModule),
    },
    {
        path: 'pairing/:id',
        data: { title: 'Emparejamiento' },
        loadChildren: () =>
            import('./modules/pairing/pairing.module').then(
                (m) => m.PairingModule
            ),
    },
    {
        path: 'garage',
        data: { title: 'Garage' },
        loadChildren: () =>
            import('./modules/garage/garage.module').then(
                (m) => m.GarageModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'inscriptions',
        data: { title: 'Inscripciones' },
        loadChildren: () =>
            import('./modules/inscriptions/inscriptions.module').then(
                (m) => m.InscriptionsModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'likes',
        data: { title: 'Me gustas' },
        loadChildren: () =>
            import('./modules/likes/likes.module').then((m) => m.LikesModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'my-data',
        data: { title: 'Mis datos' },
        loadChildren: () =>
            import('./modules/my-data/my-data.module').then(
                (m) => m.MyDataModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'privacy-policy',
        data: { title: 'Politica de privacidad' },
        loadChildren: () =>
            import('./modules/privacy-policy/privacy-policy.module').then(
                (m) => m.PrivacyPolicyModule
            ),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
