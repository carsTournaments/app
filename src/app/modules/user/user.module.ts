import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicesModule } from 'src/app/services/services.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { GaragePage, DashboardPage } from '.';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        ServicesModule,
        RouterModule.forChild([
            { path: '', component: DashboardPage },
            { path: 'garage', component: GaragePage },
        ]),
    ],
    declarations: [DashboardPage, GaragePage],
})
export class UserModule {}
