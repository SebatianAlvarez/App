import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { ActionSheetController } from '@ionic/angular';
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
    private perfilService : PerfilesService, private restauranteService : RestaurantesService ) { }

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
      },{
        text: 'Mi Menu',
        icon: 'refresh-circle',
        handler: () => {
          this.router.navigate(['/ver-menu']);
        }
      },
      {
        text: 'Actualizar Menus',
        icon: 'refresh-circle',
        handler: () => {
          this.router.navigate(['/tabs-menu/desayuno']);
        }
      },
      {
        text: 'Menu desayuno',
        icon: 'refresh-circle',
        handler: () => {
          this.router.navigate(['/menu-desayuno']);
        }
      }
      ,{
        text: 'Promociones',
        icon: 'heart',
        handler: () => {
          this.router.navigate(['/promocion']);
        }
      },{
        text: 'Afiliados',
        icon: 'body',
        handler: () => {
          this.router.navigate(['/afiliados']);
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
