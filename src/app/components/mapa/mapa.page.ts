import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker} from 'leaflet';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: Map;
  marker: any;
  latLong = [];

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.showMap();
  }

  showMap() {
    this.map = new Map('Mapa').setView([-0.209244, -78.4883887],125);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)

  }

  getPositions(){
    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((res) =>{
      return this.latLong = [
        res.coords.latitude,
        res.coords.longitude
      ]
    }).then((latLong) =>{
      this.showMarker(latLong);
    });
  }

  showMarker(latLong){
    this.marker = marker(latLong);
    this.marker.addTo(this.map).bindPopup('Estoy aqui');
    this.map.setView(latLong);
  }



}
