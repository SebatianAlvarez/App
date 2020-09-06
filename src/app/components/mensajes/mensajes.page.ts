import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReservasService } from '../../servicios/reservas.service';
import { Reserva } from '../../models/reserva-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, private router:Router, 
    private authservice: AuthService, private AFauth : AngularFireAuth, private reservasService : ReservasService) { }

    public usuarioLog:string;
    public reservas : any = [];

    public reservas$: Observable<Reserva[]>;

  ngOnInit() {

    //this.reservasService.getReservas().subscribe(data =>{
    //  this.reservas = data
    //})

    this.reservas$ = this.reservasService.recuperarDatos()

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }

  }

  goRegreso(){
    this.router.navigate(['/listado'])
  }

  onLogout(){
    this.authservice.logout();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Cerrar Sesion',
        icon: 'log-out',
        handler: () => {
         this.onLogout();
        }
      }]
    });
    await actionSheet.present();
    let result = await actionSheet.onDidDismiss();
  }

}
