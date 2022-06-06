import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabungan',
    loadChildren: () => import('./tab-tabungan/tab-tabungan.module').then( m => m.TabTabunganPageModule)
  },
  {
    path: 'add-tabungan',
    loadChildren: () => import('./add-tabungan/add-tabungan.module').then( m => m.AddTabunganPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'edit-tabungan',
    loadChildren: () => import('./edit-tabungan/edit-tabungan.module').then( m => m.EditTabunganPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
