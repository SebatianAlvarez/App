import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { ReservaPage } from '../reserva/reserva.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'reserva',
        loadChildren: '../reserva/reserva.module#ReservaPageModule'
      },
      {
        path: 'aprobada',
        loadChildren: '../reserva-aceptada/reserva-aceptada.module#ReservaAceptadaPageModule'
      },
      {
        path: 'rechazada',
        loadChildren: '../reserva-rechazada/reserva-rechazada.module#ReservaRechazadaPageModule'
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
    ReservaPage
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
