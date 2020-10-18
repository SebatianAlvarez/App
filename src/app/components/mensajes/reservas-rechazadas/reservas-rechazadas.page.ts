import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { resta } from '../../../models/restaurante-interface';
import { Reserva } from '../../../models/reserva-interface';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ReservasService } from '../../../servicios/reservas.service';
import { RestaurantesService } from '../../../servicios/restaurantes.service';

@Component({
  selector: 'app-reservas-rechazadas',
  templateUrl: './reservas-rechazadas.page.html',
  styleUrls: ['./reservas-rechazadas.page.scss'],
})
export class ReservasRechazadasPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, private router:Router, private restauranteSvc: RestaurantesService,
    private authservice: AuthService, private AFauth : AngularFireAuth, private reservasService : ReservasService, public alertController: AlertController) { }

  public usuarioLog:string;
    public reservas : any = [];
    public valorReserva: boolean =true;

    public reservas$: Observable<Reserva[]>;
    public restaurante$: Observable<resta[]>;

    // Variables para almacenar y validar si hay datos
    listaRestaurante: resta[]= [];
    listaReservasP: Reserva[]=[];
    existeDatos: boolean;

  ngOnInit() {

    this.existeDatos = false;
    this.reservas$ = this.reservasService.recuperarDatos()
    this.restaurante$ = this.restauranteSvc.recuperarDatos()

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }

    this.reservasService.listar().subscribe(rp =>{
      this.listaReservasP = [];
      this.listaRestaurante =[];
      rp.forEach(elementRP => {
        this.restauranteSvc.listar().subscribe(res =>{

          res.forEach(elementR => {
            if(this.usuarioLog === elementRP.uidUsu && elementR.userUID === elementRP.uidResta && elementRP.estado === 'Rechazado'){
              this.listaReservasP.push(elementRP);
              this.listaRestaurante.push(elementR);
              console.log(this.listaRestaurante);
              console.log(this.listaReservasP);
              this.existeDatos = true;
              this.validarDatos(this.existeDatos);
              
            }
          });
        })
      });
    })
  }

  validarDatos(valor: boolean){
    if(valor == true){
      return true
    }else if(valor == false){
      return false
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

  // Aun no funciona
  sinReserva(){
    this.reservasService.listar().subscribe(data =>{
      console.log("reservas", data);
      console.log("reservas", this.usuarioLog);
      for(let reserva of data){
        if(this.usuarioLog === reserva.uidUsu){
          console.log("si existe");
          break;
        }else if(this.usuarioLog != reserva.uidUsu && reserva.uidUsu){
          console.log("no");
          this.valorReserva = false; 
        }
      }
      this.validarReserva(this.valorReserva)
      console.log(this.validarReserva(this.valorReserva));
    })
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
