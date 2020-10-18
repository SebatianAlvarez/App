import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsRestaurantesAfiliadosPage } from './tabs-restaurantes-afiliados.page';

const routes: Routes = [
  {
    path: '',
    component: TabsRestaurantesAfiliadosPage,
    children:[
      {
        path: 'afiliados',
        loadChildren: '../restaurantes-afiliados/restaurantes-afiliados.module#RestaurantesAfiliadosPageModule'
      },
      {
        path: 'noAfiliados',
        loadChildren: '../restaurantes-no-afiliados/restaurantes-no-afiliados.module#RestaurantesNoAfiliadosPageModule'
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
  declarations: [TabsRestaurantesAfiliadosPage]
})
export class TabsRestaurantesAfiliadosPageModule {}
