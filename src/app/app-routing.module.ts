import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@core/guards/check-token.guard';

const routes: Routes = [
    {
        path: 'home',
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
        loadChildren: () =>
            import('./modules/tournament/tournament.module').then(
                (m) => m.TournamentModule
            ),
    },
    {
        path: 'car/:id',
        loadChildren: () =>
            import('./modules/car/car.module').then((m) => m.CarModule),
    },
    {
        path: 'pairing/:id',
        loadChildren: () =>
            import('./modules/pairing/pairing.module').then(
                (m) => m.PairingModule
            ),
    },
    {
        path: 'garage',
        loadChildren: () =>
            import('./modules/garage/garage.module').then(
                (m) => m.GarageModule
            ),
        canActivate: [LoginGuard],
    },
    {
        path: 'inscriptions',
        loadChildren: () =>
            import('./modules/inscriptions/inscriptions.module').then(
                (m) => m.InscriptionsModule
            ),
        canActivate: [LoginGuard],
    },
    {
        path: 'likes',
        loadChildren: () =>
            import('./modules/likes/likes.module').then((m) => m.LikesModule),
        canActivate: [LoginGuard],
    },
    {
        path: 'my-data',
        loadChildren: () =>
            import('./modules/my-data/my-data.module').then(
                (m) => m.MyDataModule
            ),
        canActivate: [LoginGuard],
    },
    {
        path: 'privacy-policy',
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
