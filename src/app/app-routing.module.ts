import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate:[NologinGuard]},
  { path: 'mapa', loadChildren: './components/mapa/mapa.module#MapaPageModule', canActivate:[AuthGuard] },
  { path: 'perfil', loadChildren: './components/perfil/perfil.module#PerfilPageModule', canActivate:[AuthGuard] },
  { path: 'reserva', loadChildren: './components/reserva/reserva.module#ReservaPageModule', canActivate:[AuthGuard] },
  { path: 'formulario-reserva', loadChildren: './components/formulario-reserva/formulario-reserva.module#FormularioReservaPageModule', canActivate:[AuthGuard] },
  { path: 'registro', loadChildren: './components/registro/registro.module#RegistroPageModule', canActivate:[AuthGuard] },
  { path: 'menu', loadChildren: './components/menu/menu.module#MenuPageModule', canActivate:[AuthGuard] },
  { path: 'listado', loadChildren: './components/listado/listado.module#ListadoPageModule', canActivate:[AuthGuard] },
  { path: 'recuperar', loadChildren: './components/recuperar/recuperar.module#RecuperarPageModule', canActivate:[AuthGuard] },
  { path: 'actualizar-perfil', loadChildren: './components/actualizar-perfil/actualizar-perfil.module#ActualizarPerfilPageModule', canActivate:[AuthGuard] },
  { path: 'error', loadChildren: './components/error/error.module#ErrorPageModule', canActivate:[AuthGuard] },
  { path: 'promocion', loadChildren: './components/promocion/promocion.module#PromocionPageModule', canActivate:[AuthGuard] },
  { path: 'mensajes', loadChildren: './components/mensajes/mensajes.module#MensajesPageModule', canActivate:[AuthGuard] },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
