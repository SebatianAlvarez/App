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
  
  public UsuarioId = null;

  constructor( private authservice: AuthService, private actionSheetController : ActionSheetController,
    private router: Router, private AFauth : AngularFireAuth,private perfilService : PerfilesService,
     private loadingController: LoadingController, private formBuilder: FormBuilder,
     private fotosService: FotosService, private alertController : AlertController ) { }

     public errorMensajes ={
      nombre : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'},
        { type: 'pattern', message: 'El campo debe contener solo caracteres'}
      ],
      apellido : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'},
        { type: 'pattern', message: 'El campo debe contener solo caracteres'}
      ],
      numero : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 10 números'},
        { type: 'pattern', message: 'El campo  debe contener solo números'}
      ],
      email : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'email', message: 'Ingrese un correo válido'}
      ]
    };

    public actualizar = this.formBuilder.group ({
      id: new FormControl (''),
      nombre: new FormControl ('', [Validators.required, Validators.pattern("^[a-zA-Z]*$") , Validators.minLength(3), Validators.maxLength(20)]),
    });
    public actualizar3 = this.formBuilder.group ({
      id: new FormControl (''),
      apellido: new FormControl ('', [Validators.required, Validators.pattern("^[a-zA-Z]*$") , Validators.minLength(3), Validators.maxLength(20)], ),
    });

    public actualizar2 = this.formBuilder.group ({
      id: new FormControl (''),
      numero: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10)])
    });

    public actualizar4 = this.formBuilder.group ({
      id: new FormControl (''),
      email: new FormControl('', [Validators.required, Validators.email])
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
        let Usuario1: Usuario = {

          nombre : valores.nombre,
        };
       
        this.perfilService.updateUsuario(this.UsuarioId, Usuario1).then(() =>{
          loading.dismiss();
          this.router.navigate(['/perfil'])
        })
      }
    }

    actualizarUsuarioContra(){
      const valores = this.actualizar4.value
      let correo = valores.email
      this.authservice.restablecerContra(correo);
      this.presentAlertContra();
    }

    async actualizarUsuarioNumero(){
      const loading = await this.loadingController.create({
        message:"Actualizando....."
      });
      await loading.present();

      if (this.UsuarioId){
        const valores = this.actualizar2.value;
        let Usuario2: Usuario = {
          numero : valores.numero,
        };
       
        this.perfilService.updateUsuario(this.UsuarioId, Usuario2).then(() =>{
          loading.dismiss();
          this.router.navigate(['/perfil'])
        })
      }
    }

    goRegreso(){
      window.location.replace('/listado')
    }

    async actualizarUsuarioApellido(){
      const loading = await this.loadingController.create({
        message:"Actualizando....."
      });
      await loading.present();

      if (this.UsuarioId){
        const valores = this.actualizar3.value;
        let Usuario3: Usuario = {
          apellido : valores.apellido,
        };
       
        this.perfilService.updateUsuario(this.UsuarioId, Usuario3).then(() =>{
          loading.dismiss();
          this.router.navigate(['/perfil'])
        })
      }
    }


  onLogout(){
    this.authservice.logout();
  }

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

async presentAlertContra() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Revisa tu correo para realizar el cambio de contraseña',
    // subHeader: 'Subtitle',
    // message: 'This is an alert message.',
    buttons : [
      {
        text : "OK",
        handler :() =>{
          this.router.navigate(['/perfil'])
        }
      }
    ]
  });

  await alert.present();
}

}
