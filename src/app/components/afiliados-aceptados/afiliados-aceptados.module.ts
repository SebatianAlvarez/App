import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AfiliadosAceptadosPage } from './afiliados-aceptados.page';

const routes: Routes = [
  {
    path: '',
    component: AfiliadosAceptadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AfiliadosAceptadosPage]
})
export class AfiliadosAceptadosPageModule {}
