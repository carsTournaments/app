import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MyLikesPage } from './pages/my-likes/my-likes.page';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: MyLikesPage,
            },
        ]),
    ],
    declarations: [MyLikesPage],
    providers: [],
})
export class MyLikesModule {}
