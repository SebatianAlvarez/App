import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../servicios/auth.service'; 
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

//librerias para el uso Firebase

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app'

import { MenuService } from '../servicios/menu.service';

import { FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('slides') slides: IonSlides;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  providerFb: firebase.auth.FacebookAuthProvider;

  public email:string;
  public password:string;
  passwordType : string ="password";
  showPassword = false
  passwordToggleIcon ='eye'

  nombreGoogle: string
  correoGoogle: string

  constructor(private authService: AuthService, private router: Router, private afBD: AngularFireDatabase,
    public afAuth : AngularFireAuth, private fb: Facebook, public platform: Platform,
    private menuService: MenuService, private formBuilder: FormBuilder) {

     this.providerFb = new firebase.auth.FacebookAuthProvider();
    }

    public errorMensajes ={
      email : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'email', message: 'Ingrese un correo válido'}
      ],
      password : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 8 caracteres'}
      ]
    };
  
    public login = this.formBuilder.group ({
      id: new FormControl (''),
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
  
    });


    mostrarContra(): void{
      this.showPassword = !this.showPassword;

      if(this.passwordToggleIcon === 'eye'){
        this.passwordToggleIcon ='eye-off';
      } else {
        this.passwordToggleIcon = 'eye'
      }
    }


    facebookLogin(){
      if(this.platform.is('cordova')){
          this.facebookCordova();
      } else {
          console.log('platform: web')
          this.facebookWeb();
      }
    }

    facebookCordova(){
      return this.fb.login(['email', 'public_profile']).then( (response: FacebookLoginResponse) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
         return firebase.auth().signInWithCredential(facebookCredential).then( (success) => {
          this.authService.actualizarUsuarioDataSocial(success.user)
          console.log('Info facebook: '+ JSON.stringify(success));
          // this.router.navigate(['/perfil']);
        }).catch((error) => {
          console.log('Error: '+ JSON.stringify(error));
        });
      }).catch((error) => {
        console.log(error);
      });
    }

    facebookWeb(){
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((success) => {
        console.log('Info Facebook '+ JSON.stringify(success));
        this.authService.actualizarUsuarioDataSocial(success.user)
        // this.authService.actualizarUsuario(success.user)
        this.router.navigate(['/listado']);
      }).catch((err) => {
        if(err.code === 'auth/account-exists-with-different-credential'){
          let FaceCred = err.credential;
          let GooCred = new auth.GoogleAuthProvider();
          GooCred.setCustomParameters({ 'login_hint': err.email});

          return auth().signInWithPopup(GooCred).then(res => {
            return res.user.linkWithCredential(FaceCred);
          });
        }
      });
    }

    ingresoGoogle(){
    
     this.authService.loginGoogle().then( (r) =>{
        console.log("in", r);
        this.router.navigate(['/listado']);
     }).catch(err => {
       alert("Contraseña o Correo incorrectos aver" + err)
     })
    }


  OnSubmitLogin(){
    const valores = this.login.value
    this.authService.login(valores.email, valores.password).then(res => {
    
      //this.router.navigate(['/listado']);
    }).catch(err => alert("Correo o contraseña incorrecta"))
  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

}
