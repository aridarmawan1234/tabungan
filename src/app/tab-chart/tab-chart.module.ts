import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TabChartPageRoutingModule } from './tab-chart-routing.module';

import { TabChartPage } from './tab-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabChartPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [TabChartPage]
})
export class TabChartPageModule {}
