import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActualizarPerfilPage } from './actualizar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarPerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActualizarPerfilPage]
})
export class ActualizarPerfilPageModule {}
