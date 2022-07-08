import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { InscriptionsPage } from './pages/inscriptions/inscriptions.page';

@NgModule({
    imports: [
        SharedModule,
        TranslateModule,
        RouterModule.forChild([{ path: '', component: InscriptionsPage }]),
    ],
    declarations: [InscriptionsPage],
    providers: [ImagePipe],
})
export class InscriptionsModule {}
