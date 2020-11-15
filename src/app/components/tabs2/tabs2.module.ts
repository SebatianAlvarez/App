import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tabs2Page } from './tabs2.page';
import { AfiliadosPage} from '../afiliados/afiliados.page'

const routes: Routes = [
  {
    path: '',
    component: Tabs2Page,
    children:[
      {
        path: 'Afiliados',
        loadChildren: '../afiliados/afiliados.module#AfiliadosPageModule'
        //loadChildren: '../reserva/reserva.module#ReservaPageModule'
      },
      {
        path: 'Aprobados',
        loadChildren: '../afiliados-aceptados/afiliados-aceptados.module#AfiliadosAceptadosPageModule'
        //loadChildren: '../reserva-aceptada/reserva-aceptada.module#ReservaAceptadaPageModule'
      },
      

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
    AfiliadosPage
  ],
  declarations: [Tabs2Page]
})
export class Tabs2PageModule {}
