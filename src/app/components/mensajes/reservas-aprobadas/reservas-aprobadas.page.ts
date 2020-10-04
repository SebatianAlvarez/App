import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../../../models/reserva-interface';
import { resta } from '../../../models/restaurante-interface';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestaurantesService } from '../../../servicios/restaurantes.service';
import { ReservasService } from '../../../servicios/reservas.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-reservas-aprobadas',
  templateUrl: './reservas-aprobadas.page.html',
  styleUrls: ['./reservas-aprobadas.page.scss'],
})
export class ReservasAprobadasPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, private router:Router, private restauranteSvc: RestaurantesService,
    private authservice: AuthService, private AFauth : AngularFireAuth, private reservasService : ReservasService, public alertController: AlertController) { }

  public usuarioLog:string;
  public reservas : any = [];
  public valorReserva: boolean =true;

  public reservas$: Observable<Reserva[]>;
  public restaurante$: Observable<resta[]>;

  ngOnInit() {
    this.reservas$ = this.reservasService.recuperarDatos()
    this.restaurante$ = this.restauranteSvc.recuperarDatos()

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }
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
  
  // metodo para cambiar el estado de la variable
  validarReserva(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
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
