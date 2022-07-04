import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LikesPage } from './pages/likes/likes.page';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: LikesPage,
            },
        ]),
    ],
    declarations: [LikesPage],
    providers: [],
})
export class LikesModule {}
