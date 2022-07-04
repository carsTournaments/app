import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardResumeComponent } from './components/dashboard-resume/dashboard-resume.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountPage } from './pages/account/account.page';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthSelectionComponent } from './components/auth-selection/auth-selection.component';
import { AuthAfterRegisterComponent } from './components/auth-after-register/auth-after-register.component';

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
        AuthSelectionComponent,
        AuthLoginComponent,
        AuthRegisterComponent,
        AuthAfterRegisterComponent,
    ],
})
export class AccountModule {}
