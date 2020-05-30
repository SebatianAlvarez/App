import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../servicios/auth.service';
import { RestaurantesService, resta,platos } from '../../servicios/restaurantes.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { Reserva } from 'src/app/models/reserva-interface';


@Component({
  selector: 'app-perfil-res',
  templateUrl: './perfil-res.component.html',
  styleUrls: ['./perfil-res.component.scss'],
})
export class PerfilResComponent implements OnInit {

  public res:resta
  public Platos : platos[]

  public usuarioLog:string;
  public UsuarioRoles: Usuario[]
  public rolActual: string[]

  public platoID:platos[]
  public resta : any = [];
  public ayuda : string

  constructor( private navparams: NavParams, private modal:ModalController, private authservice: AuthService,
    public actionSheetController: ActionSheetController, private router:Router, private restauranteService : RestaurantesService,
    private AFauth : AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit() {

    this.res = this.navparams.get('res')
    this.Platos = this.navparams.get('plato')
    console.log("Perfil resta: "+ this.res.userUID)
    
    
    /*   Esto cojo una "x" q tiene los datos del perfil buscado
    this.restauranteService.getPlatos().subscribe(data => {
      data.forEach((plato : platos) => {
        if(this.res.userUID == plato.userUID){
          this.platoID = [plato]
          for(let x of this.platoID){
            console.log("y ahora : " + x.userUID)
            
          }
        }
      })
    })
    */

  }
  

  goRegreso(){
    this.modal.dismiss();
  }

  goMapa(){
    this.modal.dismiss(this.router.navigate(['/mapa']));
  }

  goReserva(){
    this.modal.dismiss(this.router.navigate(['/formulario-reserva']));
  }

  goPeticion(){
    this.modal.dismiss(this.router.navigate(['/reserva']));
  }

  goMenu(){
    this.modal.dismiss(this.router.navigate(['/menu']));
  }

  goPerfil(){
    this.modal.dismiss(this.router.navigate(['/perfil']));
  }

  goActualizarperfil(){
    this.modal.dismiss(this.router.navigate(['/actualizar-perfil']))
  }

  onLogout(){
    this.authservice.logout();
  }

  getMenu(){

    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;

    this.authservice.getUsuario().subscribe(data =>{
      data.forEach((usuario: Usuario) => {

        if (this.usuarioLog == usuario.uid){
          this.UsuarioRoles = [usuario]
          for(let user of this.UsuarioRoles){
            this.rolActual = user.roles
            this.presentActionSheet(this.rolActual.toString())
          }
        }
      })
    })
  }

 async presentActionSheet(rol :string) {
    
  if( rol == 'dueño'){
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Mi Perfil',
        icon: 'person',
        handler: () => {
          this.goPerfil();
        }
      },{
        text: 'Editar Perfil',
        icon: 'settings',
        handler: () => {
          this.goActualizarperfil()
        }
      },{
        text: 'Visualizar Peticiones',
        icon: 'eye',
        handler: () => {
          this.goPeticion();
        }
      }, {
        text: 'Actualizar Menu',
        icon: 'refresh-circle',
        handler: () => {
          this.goMenu();
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
  }else if (rol = 'cliente'){
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Mi Perfil',
        icon: 'person',
        handler: () => {
          this.goPerfil();
        }
      },{
        text: 'Editar Perfil',
        icon: 'settings',
        handler: () => {
          this.goActualizarperfil()
        }
      },{
        text: 'Realizar Reserva',
        icon: 'clipboard',
        handler: () => {
          this.goReserva();
          this.Reservar();
        }
      },{
        text: '¿Cómo Llegar?',
        icon: 'map',
        handler: () => {
          this.goMapa();
        }
      },{
        text: 'Restaurantes',
        icon: 'restaurant',
        handler: () => {
          this.goRegreso();
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

getRestauranteActual(){
  console.log("aver " + this.res.userUID)
}

Reservar( ){

  let reserva = new Reserva();
    
  return new Promise<any>((resolve, reject) => {
    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;
    let reservaID = this.db.createId();
    reserva.uid = reservaID;
    this.db.collection('reservas').doc(reservaID).set({
      usuario : this.usuarioLog,
      resta : this.res.userUID,
      uid : reserva.uid
    }).then((res) =>{
      resolve(res)
    }).catch(err => reject(err))
  })

}

}
