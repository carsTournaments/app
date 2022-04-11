import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule, PipesModule, ServicesModule } from 'src/app';
import { ImagePipe } from 'src/app/pipes';
import { PairingPage } from './pairing.page';
import { PairingModalComponent } from './modal/pairing-modal.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ServicesModule,
        ComponentsModule,
        PipesModule,
        RouterModule.forChild([
            {
                path: '',
                component: PairingPage,
            },
        ]),
    ],
    declarations: [PairingPage, PairingModalComponent],
    providers: [ImagePipe],
})
export class PairingModule {}
