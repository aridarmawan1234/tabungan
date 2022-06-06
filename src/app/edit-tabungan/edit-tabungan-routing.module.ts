import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTabunganPage } from './edit-tabungan.page';

const routes: Routes = [
  {
    path: '',
    component: EditTabunganPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTabunganPageRoutingModule {}
