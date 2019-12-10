import { Component, OnInit } from '@angular/core';
import { RestaurantesService, resta } from '../../servicios/restaurantes.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public restaurantes : any = [];

  constructor( public restauranteService: RestaurantesService ) { }

  ngOnInit() {

    this.restauranteService.getRestaurantes().subscribe( resta => {
      this.restaurantes = resta;
    })
  }

}
