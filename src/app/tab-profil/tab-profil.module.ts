import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabProfilPageRoutingModule } from './tab-profil-routing.module';

import { TabProfilPage } from './tab-profil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabProfilPageRoutingModule
  ],
  declarations: [TabProfilPage]
})
export class TabProfilPageModule {}
