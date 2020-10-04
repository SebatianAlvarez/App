import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReservasAprobadasPage } from './reservas-aprobadas.page';

const routes: Routes = [
  {
    path: '',
    component: ReservasAprobadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReservasAprobadasPage]
})
export class ReservasAprobadasPageModule {}
