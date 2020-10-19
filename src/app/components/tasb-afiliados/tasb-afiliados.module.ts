import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TasbAfiliadosPage } from './tasb-afiliados.page';
import { RestaurantesAfiliadosPage } from '../restaurantes-afiliados/restaurantes-afiliados.page'

const routes: Routes = [
  {
    path: '',
    component: TasbAfiliadosPage,
    children:[
      {
        path: 'Aprobados',
        loadChildren: '../restaurantes-afiliados/restaurantes-afiliados.module#RestaurantesAfiliadosPageModule'
        //loadChildren: '../reserva/reserva.module#ReservaPageModule'
      },
      {
        path: 'Pendientes',
        loadChildren: '../restaurantes-afiliados-pendientes/restaurantes-afiliados-pendientes.module#RestaurantesAfiliadosPendientesPageModule'
        //loadChildren: '../reserva-aceptada/reserva-aceptada.module#ReservaAceptadaPageModule'
      },
      {
        path: 'Sugerencias',
        loadChildren: '../quejas/quejas.module#QuejasPageModule'
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
    RestaurantesAfiliadosPage
  ],
  declarations: [TasbAfiliadosPage]
})
export class TasbAfiliadosPageModule {}
