import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuejasRechazadasPage } from './quejas-rechazadas.page';

const routes: Routes = [
  {
    path: '',
    component: QuejasRechazadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuejasRechazadasPage]
})
export class QuejasRechazadasPageModule {}
