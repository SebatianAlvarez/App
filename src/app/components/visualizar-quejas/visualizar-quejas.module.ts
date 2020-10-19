import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisualizarQuejasPage } from './visualizar-quejas.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarQuejasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VisualizarQuejasPage]
})
export class VisualizarQuejasPageModule {}
