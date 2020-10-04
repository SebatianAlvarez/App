import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReservasRechazadasPage } from './reservas-rechazadas.page';

const routes: Routes = [
  {
    path: '',
    component: ReservasRechazadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReservasRechazadasPage]
})
export class ReservasRechazadasPageModule {}
