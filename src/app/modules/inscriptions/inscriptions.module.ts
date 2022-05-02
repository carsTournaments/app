import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicesModule } from 'src/app/services/services.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { InscriptionsPage } from './inscriptions.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { InscriptionsItemComponent } from './components/inscriptions-item/inscriptions-item.component';
import { InscriptionsStateComponent } from './components/inscriptions-state/inscriptions-state.component';
import { InscriptionsPopoverComponent } from './components/popover/inscriptions-popover.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        ServicesModule,
        PipesModule,
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
