import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReservaRechazadaPage } from './reserva-rechazada.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaRechazadaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReservaRechazadaPage]
})
export class ReservaRechazadaPageModule {}
