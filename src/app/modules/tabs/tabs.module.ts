import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: TabsPage,
                children: [
                    {
                        path: 'tournaments',
                        loadChildren: () =>
                            import('../tournaments/tournaments.module').then(
                                (m) => m.TournamentsModule
                            ),
                    },
                    {
                        path: 'cars',
                        loadChildren: () =>
                            import('../cars/cars.module').then(
                                (m) => m.CarsPageModule
                            ),
                    },
                    {
                        path: 'account',
                        loadChildren: () =>
                            import('../account/account.module').then(
                                (m) => m.AccountModule
                            ),
                    },
                    {
                        path: '',
                        redirectTo: '/tab/tournaments',
                        pathMatch: 'full',
                    },
                ],
            },
        ]),
    ],
    declarations: [TabsPage],
})
export class TabsModule {}
