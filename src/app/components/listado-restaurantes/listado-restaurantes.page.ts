import { Component, OnInit } from '@angular/core';
import { promos } from '../../models/promos-interface';
import { PromocionService } from '../../servicios/promocion.service';

@Component({
  selector: 'app-listado-restaurantes',
  templateUrl: './listado-restaurantes.page.html',
  styleUrls: ['./listado-restaurantes.page.scss'],
})
export class ListadoRestaurantesPage implements OnInit {
  
  promoHabilitados: promos[] = [];

  constructor(private promocionesService: PromocionService) { }

  ngOnInit() {

    this.promocionesService.listar().subscribe(x =>{
      this.promoHabilitados = []
      x.forEach(element => {
          this.promoHabilitados.push(element)
      });
    })
  }


}
