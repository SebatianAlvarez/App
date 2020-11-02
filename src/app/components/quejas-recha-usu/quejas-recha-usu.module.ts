import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuejasRechaUsuPage } from './quejas-recha-usu.page';

const routes: Routes = [
  {
    path: '',
    component: QuejasRechaUsuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuejasRechaUsuPage]
})
export class QuejasRechaUsuPageModule {}
