import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTabunganPage } from './add-tabungan.page';

const routes: Routes = [
  {
    path: '',
    component: AddTabunganPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTabunganPageRoutingModule {}
