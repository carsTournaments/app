import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardResumeComponent } from './components/dashboard-resume/dashboard-resume.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountPage } from './account.page';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        SharedModule,
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
