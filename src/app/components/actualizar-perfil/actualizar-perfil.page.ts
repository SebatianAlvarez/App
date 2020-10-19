import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../../models/usuario-interface';
import { PerfilesService } from '../../servicios/perfiles.service';

import { NavController, LoadingController } from '@ionic/angular';
import { FormControl , Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Foto } from '../../models/fotos-interface';
import { FotosService } from '../../servicios/fotos.service';


@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.page.html',
  styleUrls: ['./actualizar-perfil.page.scss'],
})
export class ActualizarPerfilPage implements OnInit {

  public Usuarios : Usuario[];

  public usuarioLog:string;
  public UsuarioRoles: Usuario[];
  public rolActual: string[];

  public numero:string;
  public nombre:string;

  public fotos$: Observable<Foto[]>;
  public usuarios$: Observable<Usuario[]>;

  public Usuario: Usuario = {

    nombre : '',
    numero : '',
  };
  
  public UsuarioId = null;

  constructor( private authservice: AuthService, private actionSheetController : ActionSheetController,
    private router: Router, private AFauth : AngularFireAuth,private perfilService : PerfilesService,
     private loadingController: LoadingController, private formBuilder: FormBuilder,
     private fotosService: FotosService, private alertController : AlertController ) { }

     public errorMensajes ={
      nombre : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'}
      ],
      numero : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 10 caracteres'},
        { type: 'pattern', message: 'El campo  solo contiene números'}
      ]
    };

    public actualizar = this.formBuilder.group ({
      id: new FormControl (''),
      nombre: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      numero: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10)])
    });

  ngOnInit() {

    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;

    this.UsuarioId = this.usuarioLog

    this.fotos$ = this.fotosService.recuperarDatos();

    this.usuarios$ = this.authservice.recuperarDatos();

    }

    async actualizarUsuario(){
      const loading = await this.loadingController.create({
        message:"Actualizando....."
      });
      await loading.present();

      if (this.UsuarioId){
        const valores = this.actualizar.value;
        this.Usuario.nombre = valores.nombre
        this.Usuario.numero = valores.numero
        this.perfilService.updateUsuario(this.UsuarioId, this.Usuario).then(() =>{
          loading.dismiss();
          this.router.navigate(['/perfil'])
        })
      }
    }


  onLogout(){
    this.authservice.logout();
  }

  /*

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

  */
 /*

 async presentActionSheet(rol :string) {
    
  if( rol == 'dueño'){
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Mi Perfil',
        icon: 'person',
        handler: () => {
          this.router.navigate(['/perfil']);
        }
      },{
        text: 'Visualizar Peticiones',
        icon: 'eye',
        handler: () => {
          this.router.navigate(['/reserva']);
        }
      },{
        text: 'Peticiones Aceptadas',
        icon: 'checkmark-circle-outline',
        handler: () => {
          this.router.navigate(['/reserva-aceptada']);
        }
      },{
        text: 'Actualizar Menu',
        icon: 'refresh-circle',
        handler: () => {
          this.router.navigate(['/menu']);
        }
      },{
        text: 'Promociones',
        icon: 'heart',
        handler: () => {
          this.router.navigate(['/promocion'])
        }
      }, {
        text: 'Promociones Activas',
        icon: 'done-all',
        handler: () => {
          this.router.navigate(['/promo-activa']);
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
      }, {
        text: 'Mi Perfil',
        icon: 'person',
        handler: () => {
          this.router.navigate(['/perfil'])
        }
      },{
        text: 'Mensajes',
        icon: 'mail',
        handler: () => {
          this.router.navigate(['/mensajes'])
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

*/

async presentarMensaje(idu : string , idf : string){
  const alert = await this.alertController.create({
    header:'Cambiar Avatar',
    message: 'Te gusta este Avatar',
    buttons : [
      {
        text : "Cancelar",
        role : "cancel",
        cssClass : "secondary",
        handler: () =>{

        }
      },{
        text : "Cambiar",
        handler :() =>{
          this.cambiarAvatar(idu, idf)
          this.router.navigate(['/perfil'])
        }
      }
    ]
  })
  await alert.present()
  let result = await alert.onDidDismiss();
}

cambiarAvatar(idu : string , idf : string){
  
  this.fotosService.getFoto(idf).subscribe(data =>{
    let usu : Usuario = {
      foto : data.foto
    }
    this.authservice.updateUser(idu, usu)
  })
}

}
