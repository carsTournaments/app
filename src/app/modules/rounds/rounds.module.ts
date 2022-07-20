import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RoundsPage } from './pages/rounds/rounds.page';
import { RoundInfoComponent } from './components/round-info/round-info.component';
import { RoundPairingsComponent } from './components/round-pairings/round-pairings.component';

@NgModule({
    imports: [
        SharedModule,
        TranslateModule,
        RouterModule.forChild([{ path: '', component: RoundsPage }]),
    ],
    declarations: [RoundsPage, RoundInfoComponent, RoundPairingsComponent],
    providers: [ImagePipe],
})
export class RoundsModule {}
