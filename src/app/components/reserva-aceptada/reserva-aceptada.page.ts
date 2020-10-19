import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../servicios/reservas.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Reserva } from '../../models/reserva-interface';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-reserva-aceptada',
  templateUrl: './reserva-aceptada.page.html',
  styleUrls: ['./reserva-aceptada.page.scss'],
})
export class ReservaAceptadaPage implements OnInit {

  public reservas: any =[];
  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;

  public reservas$: Observable<Reserva[]>;

  // Variables para validar si existen datos
  listaReservas: Reserva[] = [];
  existeDatos: boolean;

  constructor(public reservasService: ReservasService, private authservice: AuthService,
    private router:Router, private AFauth : AngularFireAuth, private alertController: AlertController, public actionSheetController: ActionSheetController) { }

  ngOnInit() {

    this.existeDatos = false;
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

    this.reservasService.listar().subscribe(r =>{
      this.listaReservas = [];
      r.forEach(element => {
        if(this.usuarioLog === element.uidResta && element.estado === 'Aprobado'){
          this.listaReservas.push(element);
          console.log(this.listaReservas);
          this.existeDatos = true;
          this.validarDatos(this.existeDatos);   
        }
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

  eliminar(id :string){
    this.reservasService.deleteReserva(id)
  }

  EditarReserva(id : string){
    this.reservasService.getReserva(id).subscribe(data =>{
      let reserva : Reserva = {
        nombre : data.nombre,
        numero : data.numero,
        mesas : data.mesas,
        tiempo :data.tiempo,
        uid : data.uid,
        uidResta : data.uidResta,
        uidUsu : data.uidUsu,
        estado : "En Revision"
      }
      this.reservasService.updateReserva(id , reserva);
    })
  }

  async alertEditar(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reserva cancelada',
      // subHeader: 'Subtitle',
      message: 'La reserva ha sido cancelada.',
      buttons: ['OK']
    });
    this.EditarReserva(id);
    await alert.present();
  }

  async alertEliminar(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reserva Eliminada',
      // subHeader: 'Subtitle',
      message: 'La reserva ha sido cancelada.',
      buttons: ['OK']
    });
    this.eliminar(id);
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
