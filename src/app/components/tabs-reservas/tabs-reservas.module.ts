import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsReservasPage } from './tabs-reservas.page';


const routes: Routes = [
  {
    path: '',
    component: TabsReservasPage,
    children:[
      {
        path: 'reserva',
        loadChildren: '../mensajes/mensajes.module#MensajesPageModule'
      },
      {
        path: 'aprobada',
        loadChildren: '../mensajes/reservas-aprobadas/reservas-aprobadas.module#ReservasAprobadasPageModule'
      },
      {
        path: 'rechazada',
        loadChildren: '../mensajes/reservas-rechazadas/reservas-rechazadas.module#ReservasRechazadasPageModule'
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
  declarations: [TabsReservasPage]
})
export class TabsReservasPageModule {}
