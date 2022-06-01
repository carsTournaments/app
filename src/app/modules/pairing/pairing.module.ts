import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { PairingPage } from './pairing.page';
import { PairingModalComponent } from './modal/pairing-modal.component';
import { SharedModule } from '@shared/shared.module';
import { PairingHeaderComponent } from './components/pairing-header/pairing-header.component';
import { PairingBlockInfoComponent } from './components/pairing-block-info/pairing-block-info.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: PairingPage,
            },
        ]),
    ],
    declarations: [
        PairingPage,
        PairingModalComponent,
        PairingHeaderComponent,
        PairingBlockInfoComponent,
    ],
    providers: [ImagePipe],
})
export class PairingModule {}
