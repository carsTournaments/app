import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicesModule } from 'src/app/services/services.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DashboardResumeComponent } from './components/dashboard-resume/dashboard-resume.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountPage } from './account.page';
import { AuthComponent } from './components/auth/auth.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        ServicesModule,
        PipesModule,
        FontAwesomeModule,
        RouterModule.forChild([{ path: '', component: AccountPage }]),
    ],
    declarations: [
        AccountPage,
        DashboardComponent,
        DashboardResumeComponent,
        AuthComponent,
    ],
})
export class AccountModule {}
