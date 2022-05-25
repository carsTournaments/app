import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { PairingPage } from './pairing.page';
import { PairingModalComponent } from './modal/pairing-modal.component';
import { SharedModule } from '@shared/shared.module';

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
    declarations: [PairingPage, PairingModalComponent],
    providers: [ImagePipe],
})
export class PairingModule {}
