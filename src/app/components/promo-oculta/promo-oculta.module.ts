import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PromoOcultaPage } from './promo-oculta.page';

const routes: Routes = [
  {
    path: '',
    component: PromoOcultaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PromoOcultaPage]
})
export class PromoOcultaPageModule {}
