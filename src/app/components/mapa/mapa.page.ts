import { Component, OnInit } from '@angular/core';

//librerias para cargar el mapa y geolocalizacion

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker} from 'leaflet';

import { RestaurantesService } from '../../servicios/restaurantes.service';

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

  constructor(private geolocation: Geolocation, public restauranteService: RestaurantesService) { }

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
      this.showMarker(latLong);
    });
  }

  //mostrar Popup

  showMarker(latLong){
    this.marker = marker(latLong);
    this.marker.addTo(this.map).bindPopup('Estoy aqui');
    this.map.setView(latLong);
  }

  mostrarRestaurantes(){

      this.restauranteService.getRestaurantes().subscribe(resta =>{
      this.restaurantes = resta
      console.log(this.restaurantes)
      for (let  rest of this.restaurantes){
        let latLong = [
          rest.direccion._lat,
          rest.direccion._long
        ]
        this.marker = marker(latLong);
        this.marker.addTo(this.map).bindPopup('Restaurante');
      }
      
    });
  }

}
