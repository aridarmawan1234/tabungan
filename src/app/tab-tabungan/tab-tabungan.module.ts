import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabTabunganPageRoutingModule } from './tab-tabungan-routing.module';

import { TabTabunganPage } from './tab-tabungan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabTabunganPageRoutingModule
  ],
  declarations: [TabTabunganPage]
})
export class TabTabunganPageModule {}
