import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../servicios/reservas.service'

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  public reservas: any =[];

  constructor(public reservasService: ReservasService) { }

  ngOnInit() {
    this.reservasService.getReservas().subscribe( resta =>{
      this.reservas = resta;
    })
  }

}
