import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InscriptionsItemComponent } from './components/inscriptions-item/inscriptions-item.component';
import { InscriptionsStateComponent } from './components/inscriptions-state/inscriptions-state.component';
import { InscriptionsPopoverComponent } from './components/popover/inscriptions-popover.component';
import { SharedModule } from '@shared/shared.module';
import { InscriptionsPage } from './pages/inscriptions/inscriptions.page';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([{ path: '', component: InscriptionsPage }]),
    ],
    declarations: [
        InscriptionsPage,
        InscriptionsStateComponent,
        InscriptionsItemComponent,
        InscriptionsPopoverComponent,
    ],
})
export class InscriptionsModule {}
