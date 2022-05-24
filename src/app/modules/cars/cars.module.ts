import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImagePipe } from '@pipes';
import { CarsPage } from './cars.page';
import { SharedModule } from '@shared/shared.module';
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: CarsPage,
            },
        ]),
    ],
    declarations: [CarsPage],
    providers: [ImagePipe],
})
export class CarsPageModule {}
