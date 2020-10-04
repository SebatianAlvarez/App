import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'mapa', loadChildren: './components/mapa/mapa.module#MapaPageModule', canActivate:[AuthGuard] },
  { path: 'perfil', loadChildren: './components/perfil/perfil.module#PerfilPageModule', canActivate:[AuthGuard] },
  { path: 'reserva', loadChildren: './components/reserva/reserva.module#ReservaPageModule', canActivate:[AuthGuard] },
  { path: 'formulario-reserva', loadChildren: './components/formulario-reserva/formulario-reserva.module#FormularioReservaPageModule', canActivate:[AuthGuard] },
  { path: 'registro', loadChildren: './components/registro/registro.module#RegistroPageModule' },
  { path: 'menu', loadChildren: './components/menu/menu.module#MenuPageModule', canActivate:[AuthGuard] },
  { path: 'listado', loadChildren: './components/listado/listado.module#ListadoPageModule', canActivate:[AuthGuard] },
  { path: 'recuperar', loadChildren: './components/recuperar/recuperar.module#RecuperarPageModule' },
  { path: 'actualizar-perfil', loadChildren: './components/actualizar-perfil/actualizar-perfil.module#ActualizarPerfilPageModule', canActivate:[AuthGuard] },
  { path: 'error', loadChildren: './components/error/error.module#ErrorPageModule', canActivate:[AuthGuard] },
  { path: 'promocion', loadChildren: './components/promocion/promocion.module#PromocionPageModule', canActivate:[AuthGuard] },
  { path: 'mensajes', loadChildren: './components/mensajes/mensajes.module#MensajesPageModule', canActivate:[AuthGuard] },
  { path: 'reserva-aceptada', loadChildren: './components/reserva-aceptada/reserva-aceptada.module#ReservaAceptadaPageModule' , canActivate:[AuthGuard]},
  { path: 'promo-activa', loadChildren: './components/promo-activa/promo-activa.module#PromoActivaPageModule' , canActivate:[AuthGuard] },
  { path: 'afiliados', loadChildren: './components/afiliados/afiliados.module#AfiliadosPageModule', canActivate:[AuthGuard] },
  { path: 'afiliados-aceptados', loadChildren: './components/afiliados-aceptados/afiliados-aceptados.module#AfiliadosAceptadosPageModule', canActivate:[AuthGuard] },
  { path: 'promo-oculta', loadChildren: './components/promo-oculta/promo-oculta.module#PromoOcultaPageModule', canActivate:[AuthGuard] },
  { path: 'ver-menu', loadChildren: './components/ver-menu/ver-menu.module#VerMenuPageModule', canActivate:[AuthGuard] },
  { path: 'perfil-restaurante', loadChildren: './components/perfil-restaurante/perfil-restaurante.module#PerfilRestaurantePageModule', canActivate:[AuthGuard] },
  { path: 'lista-promociones-habilitadas', loadChildren: './components/lista-promociones-habilitadas/lista-promociones-habilitadas.module#ListaPromocionesHabilitadasPageModule', canActivate:[AuthGuard] },
  { path: 'restaurantes-afiliados', loadChildren: './components/restaurantes-afiliados/restaurantes-afiliados.module#RestaurantesAfiliadosPageModule', canActivate:[AuthGuard]  },
  { path: 'comentarios', loadChildren: './components/comentarios/comentarios.module#ComentariosPageModule' },
  { path: 'verificar-email', loadChildren: './components/verificar-email/verificar-email.module#VerificarEmailPageModule' },
  { path: 'tabs', loadChildren: './components/tabs/tabs.module#TabsPageModule' },
  { path: 'reserva-rechazada', loadChildren: './components/reserva-rechazada/reserva-rechazada.module#ReservaRechazadaPageModule' },
  { path: 'tabs2', loadChildren: './components/tabs2/tabs2.module#Tabs2PageModule' },
  { path: 'afiliados-rechazados', loadChildren: './components/afiliados-rechazados/afiliados-rechazados.module#AfiliadosRechazadosPageModule' },
  { path: 'tabs3', loadChildren: './components/tabs3/tabs3.module#Tabs3PageModule' },
  { path: 'menus-principales', loadChildren: './components/menus-principales/menus-principales.module#MenusPrincipalesPageModule', canActivate:[AuthGuard] },















];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
