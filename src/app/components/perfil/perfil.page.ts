import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { NavController, LoadingController } from '@ionic/angular';
import { PerfilesService } from '../../servicios/perfiles.service';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { resta } from '../../models/restaurante-interface';

import { Usuario } from '../../models/usuario-interface';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.css'],
})
export class PerfilPage implements OnInit {

  public usuarios$: Observable<Usuario[]>;
  public restaurantes: resta[];

  public usuarioLog:string;
  public UsuarioRoles: Usuario[];

  // public rolActual: string[];
  public rolActual: string;

  public perfil : any = [];
  public perfilID:Usuario[];

  public numero:string;
  public nombre:string;

  public UsuarioId = null;



  constructor( private authservice: AuthService, private actionSheetController : ActionSheetController,
    private router: Router, private AFauth : AngularFireAuth, private db:AngularFirestore,
    private alertController : AlertController, private loadingController: LoadingController,
    private perfilService : PerfilesService, private restauranteService : RestaurantesService,
    private plt: Platform,
    private localNotification: LocalNotifications ) { }

  ngOnInit() {
    this.usuarios$ = this.authservice.recuperarDatos();

    // this.restauranteService.getRestaurantes().subscribe(data => {
    //   this.restaurantes = data
    // })
    
    try {
      let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;

    this.UsuarioId = this.usuarioLog
      
    } catch (error) {
      console.log(error)
    }

    // this.Notificiacion2();
    // // this.Notificiacion3();
    // this.Notificiacion4();
    // this.Notificiacion5();
  }

  Notificiacion2(){
    this.localNotification.schedule({
      id:2,
      title: 'Notificacion de prueba 07:05',
      text: 'Ejemplo de notificacion',
      data: {page: 'perfil'},
      trigger: {every: {hour: 7, minute: 5} },
      foreground: true
    })
    
  }

  // Notificiacion7(){
  //   console.log("nota enviada");
    
  //   this.localNotification.schedule({
  //     id:7,
  //     title: 'notifiacion cada minuto, desde perfil',
  //     text: 'Notificacion cada minuto',
  //     data: {mydata: 'Mensaje oculto'},
  //     trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
  //     //foreground: true
  //   })   
  // }

  Notificiacion8(){
    this.localNotification.schedule({
      id:8,
      title: 'notifiacion cada minuto, desde perfil sin darle clic al boton',
      text: 'Notificacion cada minuto',
      data: {mydata: 'Mensaje oculto'},
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE },
      foreground: true
    })   
  }

  // Notificiacion3(){
  //   console.log("notificacion enviada");

  //   this.authservice.listar().subscribe(data =>{
  //     console.log(data);
  //     data.forEach(element => {
  //       if(this.usuarioLog != element.uid && element.roles != 'dueño'){
  //         console.log("este usuario", element);
  //         console.log("este rol", element.roles);
  //         this.localNotification.schedule({
  //           id:3,
  //           title: 'Notificacion de 10 segundos, con otro formato de fecha',
  //           text: 'Ejemplo de notificacion',
  //           data: {mydata: 'Mensaje oculto'},
  //           trigger: {at: new Date(new Date().getTime() + 10 * 1000)}
  //           //foreground: true
  //         })
  //       }
  //     });
  //   })
       
  // }

  Notificiacion4(){
    this.localNotification.schedule({
      id:4,
      title: 'Prueba de notificacion desde Perfil, 11:40',
      text: 'Puedes ver el menu que ofrecen tus restaurantes favoritos el dia hoy',
      data: {mydata: 'Mensaje oculto'},
      trigger: { every: {hour: 11, minute: 40} },
      foreground: true
    })
    
  }

  Notificiacion5(){
    this.localNotification.schedule({
      id:5,
      title: 'Revisa el menu del dia ',
      text: 'Puedes ver el menu que ofrecen tus restaurantes favoritos el dia hoy',
      data: {mydata: 'Mensaje oculto'},
      trigger: { every: {hour: 19, minute: 40} }
      //foreground: true
    })   
  }

  onLogout(){
    this.authservice.logout();
  }
  
  async presentModal(){
    const alert = await this.alertController.create({
      header: 'Actualizar Datos',

      inputs: [
        
        {
          name: "nombre",
          type: "text",
          placeholder: "Nombre"
        },{
          name: "numero",
          type: "text",
          placeholder: "Celular"
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
          text : "Actualizar",
          handler : data =>{
            let Usuario: Usuario = {
              nombre : data.nombre,
              numero : data.numero,
            };
            this.perfilService.updateUsuario(this.UsuarioId, Usuario)
            window.location.reload()
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
  }


 
  getMenu(){

    this.authservice.getUsuario().subscribe( data =>{
      for(let x of data){
        if(this.usuarioLog == x.uid){
          this.UsuarioRoles = [x]
          for (let user of this.UsuarioRoles){
            this.rolActual = user.roles
            this.presentActionSheet(this.rolActual.toString())
          }
        }
      }
    })
  }
  
 async presentActionSheet(rol :string) {
    
  if( rol == 'dueño'){
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Mi Restaurante',
        icon: 'pizza',
        handler: () => {
          this.router.navigate(['/perfil-restaurante']);
        }
      },{
        text: 'Visualizar Peticiones',
        icon: 'eye',
        handler: () => {
          this.router.navigate(['/tabs/reserva']);
        }
      },
      {
        text: 'Mi Menú',
        icon: 'refresh-circle',
        handler: () => {
          this.router.navigate(['/tabs-menu/desayuno']);
        }
      }
      ,{
        text: 'Promociones',
        icon: 'heart',
        handler: () => {
          this.router.navigate(['/tabs3/Agregar']);
        }
      },{
        text: 'Afiliados',
        icon: 'body',
        handler: () => {
          this.router.navigate(['/tabs2/Afiliados']);
        }
      },{
        text: 'Sugerencias',
        icon: 'alert',
        handler: () => {
          this.router.navigate(['/tabs-quejas/pendientes']);
        }
      }
      ,{
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
        text: 'Cerrar Sesion',
        icon: 'log-out',
        handler: () => {
         this.onLogout();
        }
      }]
    });
    await actionSheet.present();
    let result = await actionSheet.onDidDismiss();
  }else{

    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Informacion',
        icon: 'person',
        handler: () => {
          this.router.navigate(['/error']);
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

}
