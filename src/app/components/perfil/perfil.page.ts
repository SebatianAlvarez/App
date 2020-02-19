import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from '../../servicios/restaurantes.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public restaurantes : any = [];

  constructor( public restauranteService: RestaurantesService ) { }

  ngOnInit() {

    //mostrar datos restaurantes

    this.restauranteService.getRestaurantes().subscribe( resta => {
      this.restaurantes = resta;
      console.log(resta);
    })
  }

}
