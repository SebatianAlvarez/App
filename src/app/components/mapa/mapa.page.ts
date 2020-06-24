import { Component, OnInit } from '@angular/core';

//librerias para cargar el mapa y geolocalizacion

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker} from 'leaflet';

import { RestaurantesService } from '../../servicios/restaurantes.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: Map;
  marker: any;
  latLong = [];
  public restaurantes: any;

  constructor(private geolocation: Geolocation, public restauranteService: RestaurantesService,
    private authservice: AuthService, public actionSheetController: ActionSheetController,
    private router:Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.showMap();
  }

  //dibujar en mapa con en un punto fijo

  showMap() {
    this.map = new Map('Mapa').setView([-0.209244, -78.4883887],125);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)

  }

  //adquirir coordenadas

  getPositions(){
    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((res) =>{
      return this.latLong = [
        res.coords.latitude,  //a mi se me hace que el truco esta en esto
        res.coords.longitude    //pero el marica del lucho no me quiere ahcer caso csm -.-
      ]
    }).then((latLong) =>{
      console.log(latLong);
      this.showMarker(latLong)
    });
  }

  //mostrar Popup

  showMarker(latLong){
    this.marker = marker(latLong);
    this.marker.addTo(this.map).bindPopup('Estoy aqui');
    this.map.setView(latLong);
  }

  mostrar(){
    this.restauranteService.getRestaurantes().subscribe(data =>{
      this.restaurantes = data
      for(let res of this.restaurantes){
        this.marker = marker([res.latitud,res.longitud]);
        this.marker.addTo(this.map).bindPopup(res.nombreRestaurante);
      }
    })
  }

  goRegreso(){
    this.router.navigate(['/listado'])
  }

  onLogout(){
    this.authservice.logout();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Mi Perfil',
        icon: 'person',
        handler: () => {
          this.router.navigate(['/perfil'])
        }
      }, {
        text: 'Editar Perfil',
        icon: 'settings',
        handler: () => {
          this.router.navigate(['/actualizar-perfil'])
        }
      }, {
        text: 'Cerrar Sesion',
        icon: 'log-out',
        handler: () => {
         this.onLogout();
        }
      }]
    });
    await actionSheet.present();
    let result = await actionSheet.onDidDismiss();
  }

}
