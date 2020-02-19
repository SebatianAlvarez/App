import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormularioReservaPage } from './formulario-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioReservaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormularioReservaPage]
})
export class FormularioReservaPageModule {}
