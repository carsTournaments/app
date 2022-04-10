import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CarsOnePage } from './modules/cars';
import { PairingPage, TournamentsOnePage } from './modules/tournaments';

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
        path: 'pairing/:id',
        component: PairingPage,
    },
    {
        path: 'tournament/:id',
        component: TournamentsOnePage,
    },
    {
        path: 'car/:id',
        component: CarsOnePage,
    },
    {
        path: 'pairing/:id',
        component: PairingPage,
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
