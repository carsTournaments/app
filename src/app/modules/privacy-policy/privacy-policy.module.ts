import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { PrivacyPolicyPage } from './privacy-policy.page';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
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
