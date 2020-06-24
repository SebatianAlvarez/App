import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { PerfilesService } from '../../servicios/perfiles.service';

import { Reserva } from 'src/app/models/reserva-interface';
import { platos } from '../../models/platos-interface';
import { resta } from '../../models/restaurante-interface';
import { Usuario } from '../../models/usuario-interface';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker} from 'leaflet';

import { RestaurantesService } from '../../servicios/restaurantes.service'


@Component({
  selector: 'app-perfil-res',
  templateUrl: './perfil-res.component.html',
  styleUrls: ['./perfil-res.component.scss'],
})
export class PerfilResComponent implements OnInit {

  public res : resta
  public Platos : platos[]

  public usuarioLog : string;
  public UsuarioRoles : Usuario[]
  public rolActual : string[]

  public platoID : platos[]
  public resta : any = []

  public mostarMapa : boolean = false

  map: Map;
  marker: any;
  latLong = [];
  public restaurantes: any;

  constructor( private navparams: NavParams, private modal:ModalController, private authservice: AuthService,
    public actionSheetController: ActionSheetController, private router:Router, private AFauth : AngularFireAuth,
    private db: AngularFirestore, private alertController : AlertController, private perfil : PerfilesService,
    private geolocation: Geolocation, private restauranteService : RestaurantesService) { }

  ngOnInit() {

    this.res = this.navparams.get('res')
    this.Platos = this.navparams.get('plato')

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }

  }

  ionViewDidEnter(){
    this.showMap();
  }

  async presentModal(){
    const alert = await this.alertController.create({
      header: 'Realizar Reserva',
      inputs: [
        {
          name: "mesas",
          type: "text",
          placeholder: "Mesas a Reservar"
        },{
          name: "tiempo",
          type: "text",
          placeholder: "Tiempo estimado para llegar"
        }
      ],
      buttons : [
        {
          text : "Cancelar",
          role : "cancel",
          cssClass : "secondary",
          handler: () =>{

          }
        },{
          text : "Confirmar Reserva",
          handler : data =>{
            this.Reservar(data.mesas, data.tiempo);
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
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

  /*

  vistaMapa(){
    this.mostarMapa = true;
  }
  */

  getMenu(){


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
    let result = await actionSheet.onDidDismiss();
  }else if (rol == 'cliente'){
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
    let result = await actionSheet.onDidDismiss();
  }
}

Reservar(mesa : string, tiempo: string ){

  let reserva = new Reserva();
    
  return new Promise<any>((resolve, reject) => {

    
    let reservaID = this.db.createId();
    reserva.uid = reservaID;
    let usuario = this.perfil.getUsuario(this.usuarioLog);
    usuario.subscribe(data =>{
      this.db.collection('reservas').doc(reservaID).set({
        uidUsu : this.usuarioLog,
        uidResta : this.res.userUID,
        uid : reserva.uid,
        mesas : mesa,
        tiempo : tiempo,
        nombre : data.nombre,
        numero : data.numero,
        estado : "En Revision"
      }).then((res) =>{
        resolve(res)
      }).catch(err => reject(err))
    })
    
  })

}

aver(){
  let usuario = this.perfil.getUsuario(this.usuarioLog);
  usuario.subscribe(data =>{
    console.log("aver : "+ data.nombre)
  })
}

//dibujar en mapa con en un punto fijo

showMap() {
  this.map = new Map('Mapa').setView([-0.209244, -78.4883887],125);
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)

}

//adquirir coordenadas

getPositions(){
  this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((res) =>{
    return this.latLong = [
      res.coords.latitude,  //a mi se me hace que el truco esta en esto
      res.coords.longitude    //pero el marica del lucho no me quiere ahcer caso csm -.-
    ]
  }).then((latLong) =>{
    console.log(latLong);
    this.showMarker(latLong)
  });
}

//mostrar Popup

showMarker(latLong){
  this.marker = marker(latLong);
  this.marker.addTo(this.map).bindPopup('Estoy aqui');
  this.map.setView(latLong);
}

mostrar(id : string){
  this.restauranteService.getRestaurante(id).subscribe(data =>{
    this.restaurantes = data
    this.marker = marker([data.latitud,data.longitud]);
      this.marker.addTo(this.map).bindPopup(data.nombreRestaurante);
      this.getPositions();
  })
}

}
