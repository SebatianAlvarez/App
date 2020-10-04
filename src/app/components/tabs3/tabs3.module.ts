import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tabs3Page } from './tabs3.page';
import { PromocionPage } from '../promocion/promocion.page'

const routes: Routes = [
  {
    path: '',
    component: Tabs3Page,
    children:[
      {
        path: 'Agregar',
        loadChildren: '../promocion/promocion.module#PromocionPageModule'
        //loadChildren: '../reserva/reserva.module#ReservaPageModule'
      },
      {
        path: 'Activas',
        loadChildren: '../promo-activa/promo-activa.module#PromoActivaPageModule'
        //loadChildren: '../reserva-aceptada/reserva-aceptada.module#ReservaAceptadaPageModule'
      },
      {
        path: 'Ocultas',
        loadChildren: '../promo-oculta/promo-oculta.module#PromoOcultaPageModule'
        //loadChildren: '../reserva-rechazada/reserva-rechazada.module#ReservaRechazadaPageModule'
      }

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PromocionPage
  ],
  declarations: [Tabs3Page]
})
export class Tabs3PageModule {}
