import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuDesayunoPage } from './menu-desayuno.page';

const routes: Routes = [
  {
    path: '',
    component: MenuDesayunoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuDesayunoPage]
})
export class MenuDesayunoPageModule {}
