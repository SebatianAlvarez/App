import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaDesayunosPage } from './lista-desayunos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDesayunosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaDesayunosPage]
})
export class ListaDesayunosPageModule {}