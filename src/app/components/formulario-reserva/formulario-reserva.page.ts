import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.page.html',
  styleUrls: ['./formulario-reserva.page.scss'],
})
export class FormularioReservaPage implements OnInit {

  public nombre:string
  public numero:string
  public cantidad:string
  public pedido:string
  public tiempo:string

  constructor( private db: AngularFirestore,private authservice: AuthService,
    public actionSheetController: ActionSheetController, private router:Router) { }

  ngOnInit() {
  }

  Reservar(){
    
    return new Promise<any>((resolve, reject) => {
      this.db.collection('reservas').add({
        nombre:this.nombre,
        numero:this.numero,
        cantidad:this.cantidad,
        pedido:this.pedido,
        tiempo:this.tiempo
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
        text: 'Editar Perfil',
        icon: 'settings',
        handler: () => {
          
        }
      }, {
        text: 'Cerrar Sesion',
        icon: 'close',
        role: 'logout',
        handler: () => {
         this.onLogout();
        }
      }]
    });
    await actionSheet.present();
  }

}
