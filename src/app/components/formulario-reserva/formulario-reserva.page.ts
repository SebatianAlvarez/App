import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Reserva } from 'src/app/models/reserva-interface';
import { ReservasService } from '../../servicios/reservas.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.page.html',
  styleUrls: ['./formulario-reserva.page.scss'],
})
export class FormularioReservaPage implements OnInit {


  public mesas:string
  public tiempo:string

  public Reserva : Reserva = {
    mesas:'',
    tiempo:'',
  }

  public usuarioLog:string;


  constructor( private db: AngularFirestore,private authservice: AuthService, private router:Router,
    public actionSheetController: ActionSheetController,   private AFauth : AngularFireAuth,
    private reservaService : ReservasService, private loadingController : LoadingController,
  ) { }

  ngOnInit() {


    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;
  }

  Reservar(){
    
    return new Promise<any>((resolve, reject) => {
      this.db.collection('reservas').add({
        mesas : this.mesas,
        tiempo : this.tiempo,
        usuario : this.usuarioLog,
      }).then((res) =>{
        resolve(res)
      }).catch(err => reject(err))
    })
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
        text: 'Mi Perfil',
        icon: 'person',
        handler: () => {
          this.router.navigate(['/perfil'])
        }
      },{
        text: 'Editar Perfil',
        icon: 'settings',
        handler: () => {
          this.router.navigate(['/actualizar-perfil'])
        }
      },{
        text: 'Cerrar Sesion',
        icon: 'log-out',
        handler: () => {
         this.onLogout();
        }
      }]
    });
    await actionSheet.present();
  }

}
