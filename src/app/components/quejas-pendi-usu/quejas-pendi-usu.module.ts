import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuejasPendiUsuPage } from './quejas-pendi-usu.page';

const routes: Routes = [
  {
    path: '',
    component: QuejasPendiUsuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuejasPendiUsuPage]
})
export class QuejasPendiUsuPageModule {}
