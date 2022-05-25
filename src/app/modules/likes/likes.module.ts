import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LikesPage } from './likes.page';
import { SharedModule } from '@shared/shared.module';

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
