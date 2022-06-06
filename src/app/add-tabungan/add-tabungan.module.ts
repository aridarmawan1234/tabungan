import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTabunganPageRoutingModule } from './add-tabungan-routing.module';

import { AddTabunganPage } from './add-tabungan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTabunganPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddTabunganPage]
})
export class AddTabunganPageModule {}
