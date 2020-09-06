import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaPromocionesHabilitadasPage } from './lista-promociones-habilitadas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPromocionesHabilitadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaPromocionesHabilitadasPage]
})
export class ListaPromocionesHabilitadasPageModule {}
