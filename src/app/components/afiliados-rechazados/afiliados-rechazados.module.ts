import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AfiliadosRechazadosPage } from './afiliados-rechazados.page';

const routes: Routes = [
  {
    path: '',
    component: AfiliadosRechazadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AfiliadosRechazadosPage]
})
export class AfiliadosRechazadosPageModule {}
