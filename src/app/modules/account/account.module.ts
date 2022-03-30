import { ComponentsModule } from './../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from 'src/app/services/services.module';
import { AccountPage } from './account.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ServicesModule,
    RouterModule.forChild([{ path: '', component: AccountPage }]),
  ],
  declarations: [AccountPage]
})
export class Tab3PageModule { }
