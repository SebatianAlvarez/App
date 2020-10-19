import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestaurantesAfiliadosPendientesPage } from './restaurantes-afiliados-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantesAfiliadosPendientesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantesAfiliadosPendientesPage]
})
export class RestaurantesAfiliadosPendientesPageModule {}
