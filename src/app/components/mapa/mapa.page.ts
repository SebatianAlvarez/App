import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import 'leaflet';
import 'leaflet-routing-machine';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements AfterViewInit {

  private map
  marker: any;

  polylineRoute: any;
  mapMarkers: any[] = null;
  mapIsLoaded = false;
  markersLayer = new L.LayerGroup();
  currentCoordinate: any = null;
  routeControl: any;
  arrRoutesLatLng = [];

  constructor( ) { 
      
    }

    ngAfterViewInit() : void {

      this.map = L.map('map', {
        center: [ -0.2104022, -78.4910514 ],
        zoom: 100
      });
  
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  
  tiles.addTo(this.map);
  
  
  
  }

  marcador(lat : number, lng : number){
    this.marker = L.marker([lat, lng], {draggable:true});
    //this.marker.addTo(this.map).bindPopup('Estoy aqui');

    this.marker.on('drag', () =>{
        console.log("aver " + this.marker  )
      })

      L.Routing.control({
        waypoints: [
            L.latLng(-0.2298218,-78.5229345),
            L.latLng(-0.2144145,-78.5015749)
        ],
        language: 'es'
      }).addTo(this.map);
  }

  vamos(){
    this.marcador(-0.2104022, -78.4910514)
  }

}
