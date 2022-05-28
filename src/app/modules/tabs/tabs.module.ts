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
                        data: { title: 'Torneos' },
                        loadChildren: () =>
                            import('../tournaments/tournaments.module').then(
                                (m) => m.TournamentsModule
                            ),
                    },
                    {
                        path: 'calendar',
                        data: { title: 'Calendario' },
                        loadChildren: () =>
                            import('../calendar/calendar.module').then(
                                (m) => m.CalendarModule
                            ),
                    },
                    {
                        path: 'cars',
                        data: { title: 'Coches' },
                        loadChildren: () =>
                            import('../cars/cars.module').then(
                                (m) => m.CarsPageModule
                            ),
                    },
                    {
                        path: 'account',
                        data: { title: 'Tu cuenta' },
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
