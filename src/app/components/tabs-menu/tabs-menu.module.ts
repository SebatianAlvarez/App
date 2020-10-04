import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsMenuPage } from './tabs-menu.page';

const routes: Routes = [
  {
    path: '',
    component: TabsMenuPage,
    children:[
      {
        path: 'desayuno',
        loadChildren: '../menus/menu-desayuno/menu-desayuno.module#MenuDesayunoPageModule'
      },
      {
        path: 'almuerzo',
        loadChildren: '../menus/menus.module#MenusPageModule'
      },
      {
        path: 'especial',
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
  declarations: [TabsMenuPage]
})
export class TabsMenuPageModule {}
