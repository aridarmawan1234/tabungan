import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTabunganPageRoutingModule } from './edit-tabungan-routing.module';

import { EditTabunganPage } from './edit-tabungan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTabunganPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditTabunganPage]
})
export class EditTabunganPageModule {}
