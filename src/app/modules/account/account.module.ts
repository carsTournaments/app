import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicesModule } from 'src/app/services/services.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { AccountPage } from './dashboard/account.page';
import { DashboardResumeComponent } from './dashboard/components/dashboard-resume/dashboard-resume.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        ServicesModule,
        PipesModule,
        RouterModule.forChild([{ path: '', component: AccountPage }]),
    ],
    declarations: [AccountPage, DashboardComponent, DashboardResumeComponent],
})
export class AccountModule {}
