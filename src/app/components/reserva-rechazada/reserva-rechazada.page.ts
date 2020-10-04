import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../../models/reserva-interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReservasService } from '../../servicios/reservas.service';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-reserva-rechazada',
  templateUrl: './reserva-rechazada.page.html',
  styleUrls: ['./reserva-rechazada.page.scss'],
})
export class ReservaRechazadaPage implements OnInit {

  public reservas: any =[];
  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;


  public reservas$: Observable<Reserva[]>;

  constructor(public reservasService: ReservasService, private AFauth : AngularFireAuth, private router:Router,
    public alertController: AlertController, public actionSheetController: ActionSheetController, private authservice: AuthService) { }

  ngOnInit() {

    
    
    try {
      if(this.currentUser != null){
        this.usuarioLog = this.currentUser.uid;
      }else{
        console.log("No hay un usuariio logueado");
        this.router.navigate(['/home']);

      }
      
    } catch (error) {
      console.log(error)
      this.router.navigate(['/home']);
    }

    this.reservas$ = this.reservasService.recuperarDatos()
  }

  eliminarReserva(id: string){
    this.reservasService.deleteReserva(id);
  }

  async alertEliminar(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reserva Eliminada',
      // subHeader: 'Subtitle',
      message: 'Tu reserva ha sido eliminada.',
      buttons: ['OK']
    });
    this.eliminarReserva(id);
    await alert.present();
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
