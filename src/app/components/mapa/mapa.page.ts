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

      this.restauranteService.getDireccion().subscribe(resta =>{
      this.restaurantes = resta
      console.log(resta)
      //this.marker = marker(resta);
      //this.marker.addTo(this.map).bindPopup('averrr!!!!');
      
    });

    /*    HABER PAPU AQUI TE PONGO MI LOGICA

          ese "this.restauranteService coje lo q son las coordenadas que ya estan grabadas en la BDD como
          geopoint mismo lo que quiero es utilizar esas coordenadas para mostrar el Popup de los restaurantes
          el problema esq no me deja creo q no agarra igual esas coordenadas con la otra funcion mas arriba la 
          que dice "ShowMarker" q esa ya coje las coordenadas de ese rato donde este tu celu x asi decirlo
          no se en q estoy mal o q se te ocurre el chiste es que muestre el Popup de los restaurantes que ya estan
          guardados en la BDD

          Ya te mando tambien las capturas al face con lo q yo creo seria el error pero no cacharia como arreglarle

    */

    /* parece q aqui ai algo

     this.restauranteService.getDireccion().subscribe(resta =>{
      this.restaurantes = x =>{
        return this.latLong = [
          x.coords.latitude,
          x.coords.longitude
        ]
      }
    });

    */
  
  

    /*
    this.marker = marker(this.restauranteService.getDireccion());
    console.log(this.restauranteService.getDireccion())
    this.marker.addTo(this.map).bindPopup('restaurante');


    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) =>{
      data.coords.latitude
      data.coords.longitude
    })
    */
  }

}
