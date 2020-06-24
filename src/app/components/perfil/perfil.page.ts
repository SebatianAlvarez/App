import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Usuario } from '../../models/usuario-interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public usuarios$: Observable<Usuario[]>;
  

  public usuarioLog:string;
  public UsuarioRoles: Usuario[];

  public rolActual: string[];

  public perfil : any = [];
  public perfilID:Usuario[];

  public numero:string;
  public nombre:string;


  constructor( private authservice: AuthService, private actionSheetController : ActionSheetController,
    private router: Router, private AFauth : AngularFireAuth, private db:AngularFirestore ) { }

  ngOnInit() {
    this.usuarios$ = this.authservice.recuperarDatos();
    

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }
  
  }

  onLogout(){
    this.authservice.logout();
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
        text: 'Editar Perfil',
        icon: 'settings',
        handler: () => {
          this.router.navigate(['/actualizar-perfil']);
        }
      }, {
        text: 'Visualizar Peticiones',
        icon: 'eye',
        handler: () => {
          this.router.navigate(['/reserva']);
        }
      }, {
        text: 'Actualizar Menu',
        icon: 'refresh-circle',
        handler: () => {
          this.router.navigate(['/menu']);
        }
      },{
        text: 'Promociones',
        icon: 'heart',
        handler: () => {
          this.router.navigate(['/promocion']);
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
        text: 'Restaurantes',
        icon: 'restaurant',
        handler: () => {
          this.router.navigate(['/listado']);
        }
      },{
        text: 'Editar Perfil',
        icon: 'settings',
        handler: () => {
          this.router.navigate(['/actualizar-perfil'])
        }
      },{
        text: 'Mensajes',
        icon: 'mail',
        handler: () => {
          this.router.navigate(['/mensajes'])
        }
      }, {
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
