
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
  { path: 'comentarios', loadChildren: './components/comentarios/comentarios.module#ComentariosPageModule', canActivate:[AuthGuard] },
  { path: 'verificar-email', loadChildren: './components/verificar-email/verificar-email.module#VerificarEmailPageModule', canActivate:[AuthGuard] },
  { path: 'tabs', loadChildren: './components/tabs/tabs.module#TabsPageModule', canActivate:[AuthGuard] },
  { path: 'reserva-rechazada', loadChildren: './components/reserva-rechazada/reserva-rechazada.module#ReservaRechazadaPageModule', canActivate:[AuthGuard] },
  { path: 'menus', loadChildren: './components/menus/menus.module#MenusPageModule', canActivate:[AuthGuard] },
  { path: 'lista-menus/:id', loadChildren: './components/lista-menus/lista-menus.module#ListaMenusPageModule' , canActivate:[AuthGuard] },
  { path: 'lista-menus', loadChildren: './components/lista-menus/lista-menus.module#ListaMenusPageModule', canActivate:[AuthGuard] },
  { path: 'tabs-menu', loadChildren: './components/tabs-menu/tabs-menu.module#TabsMenuPageModule', canActivate:[AuthGuard] },
  { path: 'menu-desayuno', loadChildren: './components/menus/menu-desayuno/menu-desayuno.module#MenuDesayunoPageModule', canActivate:[AuthGuard] },
  { path: 'menue-especial', loadChildren: './components/menus/menue-especial/menue-especial.module#MenueEspecialPageModule', canActivate:[AuthGuard] },
  { path: 'lista-desayunos/:id', loadChildren: './components/listaMenus/lista-desayunos/lista-desayunos.module#ListaDesayunosPageModule' , canActivate:[AuthGuard] },
  { path: 'lista-desayunos', loadChildren: './components/listaMenus/lista-desayunos/lista-desayunos.module#ListaDesayunosPageModule', canActivate:[AuthGuard] },
  { path: 'lista-especial/:id', loadChildren: './components/listaMenus/lista-especial/lista-especial.module#ListaEspecialPageModule', canActivate:[AuthGuard] },
  { path: 'lista-especial', loadChildren: './components/listaMenus/lista-especial/lista-especial.module#ListaEspecialPageModule', canActivate:[AuthGuard] },
  { path: 'tabs-reservas', loadChildren: './components/tabs-reservas/tabs-reservas.module#TabsReservasPageModule' ,canActivate:[AuthGuard] },
  { path: 'reservas-aprobadas', loadChildren: './components/mensajes/reservas-aprobadas/reservas-aprobadas.module#ReservasAprobadasPageModule' ,canActivate:[AuthGuard] },
  { path: 'reservas-rechazadas', loadChildren: './components/mensajes/reservas-rechazadas/reservas-rechazadas.module#ReservasRechazadasPageModule', canActivate:[AuthGuard] },
  { path: 'tabs2', loadChildren: './components/tabs2/tabs2.module#Tabs2PageModule', canActivate:[AuthGuard] },
  { path: 'afiliados-rechazados', loadChildren: './components/afiliados-rechazados/afiliados-rechazados.module#AfiliadosRechazadosPageModule', canActivate:[AuthGuard] },
  { path: 'tabs3', loadChildren: './components/tabs3/tabs3.module#Tabs3PageModule', canActivate:[AuthGuard] },
  { path: 'menus-principales', loadChildren: './components/menus-principales/menus-principales.module#MenusPrincipalesPageModule', canActivate:[AuthGuard] },
  { path: 'prueba-menus', loadChildren: './menus/prueba-menus/prueba-menus.module#PruebaMenusPageModule', canActivate:[AuthGuard] },
  { path: 'listado-restaurantes', loadChildren: './components/listado-restaurantes/listado-restaurantes.module#ListadoRestaurantesPageModule', canActivate:[AuthGuard] },
  { path: 'tasb-afiliados', loadChildren: './components/tasb-afiliados/tasb-afiliados.module#TasbAfiliadosPageModule', canActivate:[AuthGuard] },
  { path: 'restaurantes-afiliados-pendientes', loadChildren: './components/restaurantes-afiliados-pendientes/restaurantes-afiliados-pendientes.module#RestaurantesAfiliadosPendientesPageModule', canActivate:[AuthGuard] },
  { path: 'quejas', loadChildren: './components/quejas/quejas.module#QuejasPageModule' , canActivate:[AuthGuard]},
  { path: 'visualizar-quejas', loadChildren: './components/visualizar-quejas/visualizar-quejas.module#VisualizarQuejasPageModule' , canActivate:[AuthGuard]},
  { path: 'quejas-aprobadas', loadChildren: './components/quejas-aprobadas/quejas-aprobadas.module#QuejasAprobadasPageModule' , canActivate:[AuthGuard]},
  { path: 'quejas-rechazadas', loadChildren: './components/quejas-rechazadas/quejas-rechazadas.module#QuejasRechazadasPageModule' , canActivate:[AuthGuard]},
  { path: 'tabs-quejas', loadChildren: './components/tabs-quejas/tabs-quejas.module#TabsQuejasPageModule', canActivate:[AuthGuard] },
  { path: 'tabs-restaurantes-afiliados', loadChildren: './components/tabs-restaurantes-afiliados/tabs-restaurantes-afiliados.module#TabsRestaurantesAfiliadosPageModule', canActivate:[AuthGuard] },
  { path: 'restaurantes-no-afiliados', loadChildren: './components/restaurantes-no-afiliados/restaurantes-no-afiliados.module#RestaurantesNoAfiliadosPageModule', canActivate:[AuthGuard] },
  { path: 'tabs-quejas-usu', loadChildren: './components/tabs-quejas-usu/tabs-quejas-usu.module#TabsQuejasUsuPageModule', canActivate:[AuthGuard] },
  { path: 'quejas-apro-usu', loadChildren: './components/quejas-apro-usu/quejas-apro-usu.module#QuejasAproUsuPageModule', canActivate:[AuthGuard] },
  { path: 'quejas-recha-usu', loadChildren: './components/quejas-recha-usu/quejas-recha-usu.module#QuejasRechaUsuPageModule', canActivate:[AuthGuard] },
  { path: 'quejas-pendi-usu', loadChildren: './components/quejas-pendi-usu/quejas-pendi-usu.module#QuejasPendiUsuPageModule', canActivate:[AuthGuard] },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
