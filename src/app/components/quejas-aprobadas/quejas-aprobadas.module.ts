import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuejasAprobadasPage } from './quejas-aprobadas.page';

const routes: Routes = [
  {
    path: '',
    component: QuejasAprobadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuejasAprobadasPage]
})
export class QuejasAprobadasPageModule {}
