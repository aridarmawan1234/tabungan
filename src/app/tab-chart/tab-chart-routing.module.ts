import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabChartPage } from './tab-chart.page';

const routes: Routes = [
  {
    path: '',
    component: TabChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabChartPageRoutingModule {}
