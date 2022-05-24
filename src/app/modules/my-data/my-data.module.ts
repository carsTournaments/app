import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyDataPage } from './my-data.page';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: MyDataPage,
            },
        ]),
    ],
    declarations: [MyDataPage],
    providers: [],
})
export class MyDataModule {}
