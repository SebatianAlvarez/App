import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReservaAceptadaPage } from './reserva-aceptada.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaAceptadaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReservaAceptadaPage]
})
export class ReservaAceptadaPageModule {}
