import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsQuejasPage } from './tabs-quejas.page';

const routes: Routes = [
  {
    path: '',
    component: TabsQuejasPage,
    children:[
      {
        path: 'pendientes',
        loadChildren: '../visualizar-quejas/visualizar-quejas.module#VisualizarQuejasPageModule'
      },
      {
        path: 'aprobadas',
        loadChildren: '../quejas-aprobadas/quejas-aprobadas.module#QuejasAprobadasPageModule'
      },
      {
        path: 'rechazadas',
        loadChildren: '../quejas-rechazadas/quejas-rechazadas.module#QuejasRechazadasPageModule'
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
  declarations: [TabsQuejasPage]
})
export class TabsQuejasPageModule {}
