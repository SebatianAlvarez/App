import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../models/usuario-interface';
import { ActionSheetController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public nombre:string;
  public email:string;
  public numero:"123456";
  public password:string;
  public rol: "cliente";

  constructor(private authSercive: AuthService, public router: Router,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private authservice : AuthService) { }

    public errorMensajes ={
      nombre : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'}
      ],
      email : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'email', message: 'Asegúrate de tener acceso a este mail'}
      ],
      numero : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 10 caracteres'},
        { type: 'pattern', message: 'El campo  solo contiene números'}
      ],
      password : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 8 caracteres'}
      ]
    };



    public registro = this.formBuilder.group ({
      id: new FormControl (''),
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      numero: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10)]),
      nombre: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    });

  ngOnInit() {

  }

  OnSubmitRegister(user: Usuario){
    this.authSercive.register(user.email, user.password, user.nombre,user.numero).then(auth =>{
      console.log(auth);
      this.OnSubmitLogin(user);
      this.presentAlert();
      
    }).catch( e => alert(e))
  }

  OnSubmitLogin(user: Usuario){
    
    this.authSercive.login(user.email, user.password).then(res => {
    
      //this.router.navigate(['/listado']);
    }).catch(err => alert("Correo o contraseña incorrecta"))
  }

  verificarEmail(){
    this.authservice.enviarEmailVerificacion()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡Listo! Revisa tu correo!',
      subHeader: '',
      message: 'Esta acción requiere una verificación de correo. Por favor reviza tu bandeja de entrada o spam y sigue las instrucciones para activar tu cuenta',
      buttons: ['OK']
    });
    this.verificarEmail();
    await alert.present();
  }




  async confirmarCorreo(user: Usuario) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Antes de continuar',
      subHeader: "Confirma que tu email sea válido",
      message: user.email,

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.OnSubmitRegister(user);
            // this.OnSubmitLogin(user);
            // this.verificarEmail();
            // this.presentAlert();
          }
        }
      ]
    });
    // this.verificarEmail();
    await alert.present();
  }

}
