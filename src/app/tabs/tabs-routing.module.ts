import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-tabungan',
        loadChildren: () => import('../tab-tabungan/tab-tabungan.module').then( m => m.TabTabunganPageModule)
      },
      {
        path: 'tab-chart',
        loadChildren: () => import('../tab-chart/tab-chart.module').then( m => m.TabChartPageModule)
      },
      {
        path: 'tab-profil',
        loadChildren: () => import('../tab-profil/tab-profil.module').then( m => m.TabProfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab-tabungan',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-tabungan',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
