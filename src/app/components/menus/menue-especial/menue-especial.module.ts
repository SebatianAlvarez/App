import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenueEspecialPage } from './menue-especial.page';

const routes: Routes = [
  {
    path: '',
    component: MenueEspecialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenueEspecialPage]
})
export class MenueEspecialPageModule {}
