import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicesModule } from 'src/app/services/services.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { GarageListPage, DashboardPage } from '.';
import { InscriptionsPage } from './inscriptions/inscriptions.page';
import { GarageOnePage } from './garage/one/garage-one.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        ServicesModule,
        PipesModule,
        RouterModule.forChild([
            { path: '', component: DashboardPage },
            { path: 'garage', component: GarageListPage },
            { path: 'garage/one/:id', component: GarageOnePage },
            { path: 'garage/create', component: GarageOnePage },
            { path: 'inscriptions', component: InscriptionsPage },
        ]),
    ],
    declarations: [
        DashboardPage,
        GarageListPage,
        GarageOnePage,
        InscriptionsPage,
    ],
})
export class UserModule {}
