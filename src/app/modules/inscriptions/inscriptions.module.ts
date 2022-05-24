import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InscriptionsPage } from './inscriptions.page';
import { InscriptionsItemComponent } from './components/inscriptions-item/inscriptions-item.component';
import { InscriptionsStateComponent } from './components/inscriptions-state/inscriptions-state.component';
import { InscriptionsPopoverComponent } from './components/popover/inscriptions-popover.component';
import { SharedModule } from '@shared/shared.module';

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
