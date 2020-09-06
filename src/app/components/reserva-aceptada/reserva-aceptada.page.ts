import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../servicios/reservas.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Reserva } from '../../models/reserva-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reserva-aceptada',
  templateUrl: './reserva-aceptada.page.html',
  styleUrls: ['./reserva-aceptada.page.scss'],
})
export class ReservaAceptadaPage implements OnInit {

  public reservas: any =[];
  public usuarioLog:string;

  public reservas$: Observable<Reserva[]>;

  constructor(public reservasService: ReservasService, private authservice: AuthService,
    public actionSheetController: ActionSheetController, private router:Router, private AFauth : AngularFireAuth) { }

  ngOnInit() {

    this.reservas$ = this.reservasService.recuperarDatos()

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }

    //this.reservasService.getReservas().subscribe( data =>{
    //  this.reservas = data;
    //})

  }

  eliminar(id :string){
    this.reservasService.deleteReserva(id)
  }

}
