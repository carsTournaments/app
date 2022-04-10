import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
