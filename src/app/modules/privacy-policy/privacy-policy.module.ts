import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule, PipesModule, ServicesModule } from 'src/app';
import { ImagePipe } from 'src/app/pipes';
import { PrivacyPolicyPage } from './privacy-policy.page';

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
                component: PrivacyPolicyPage,
            },
        ]),
    ],
    declarations: [PrivacyPolicyPage],
    providers: [ImagePipe],
})
export class PrivacyPolicyModule {}
