import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabProfilPage } from './tab-profil.page';

const routes: Routes = [
  {
    path: '',
    component: TabProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabProfilPageRoutingModule {}
