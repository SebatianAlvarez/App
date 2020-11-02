import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsQuejasUsuPage } from './tabs-quejas-usu.page';

const routes: Routes = [
  {
    path: '',
    component: TabsQuejasUsuPage,
    children:[
      {
        path: 'pendientes',
        loadChildren: '../quejas-pendi-usu/quejas-pendi-usu.module#QuejasPendiUsuPageModule'
      },
      {
        path: 'aprobadas',
        loadChildren: '../quejas-apro-usu/quejas-apro-usu.module#QuejasAproUsuPageModule'
      },
      {
        path: 'rechazadas',
        loadChildren: '../quejas-recha-usu/quejas-recha-usu.module#QuejasRechaUsuPageModule'
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
  declarations: [TabsQuejasUsuPage]
})
export class TabsQuejasUsuPageModule {}
