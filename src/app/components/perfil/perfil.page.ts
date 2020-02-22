import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { MenuService } from '../../servicios/menu.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public restaurantes : any = [];
  public menus : any = [];

  constructor( public restauranteService: RestaurantesService, public menuService: MenuService ) { }

  ngOnInit() {

    //mostrar datos restaurantes

    this.restauranteService.getRestaurantes().subscribe( resta => {
      this.restaurantes = resta;
      console.log(resta)

      this.menuService.getMenus().subscribe(menu =>{
        this.menus = menu;
        console.log(menu)
      })
    })
  }

}
