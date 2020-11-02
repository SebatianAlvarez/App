import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuejasAproUsuPage } from './quejas-apro-usu.page';

const routes: Routes = [
  {
    path: '',
    component: QuejasAproUsuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuejasAproUsuPage]
})
export class QuejasAproUsuPageModule {}
