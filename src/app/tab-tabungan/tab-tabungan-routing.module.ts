import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabTabunganPage } from './tab-tabungan.page';

const routes: Routes = [
  {
    path: '',
    component: TabTabunganPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabTabunganPageRoutingModule {}
