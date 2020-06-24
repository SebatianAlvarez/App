import { Component} from '@angular/core';
import { AuthService } from '../servicios/auth.service'; 
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';

//librerias para el uso Firebase

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app'

import { MenuService } from '../servicios/menu.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  providerFb: firebase.auth.FacebookAuthProvider;

  public email:string;
  public password:string;

  constructor(private authService: AuthService, private router: Router, private afBD: AngularFireDatabase,
    public afAuth : AngularFireAuth, private fb: Facebook, public platform: Platform,
    private menuService: MenuService) {

     this.providerFb = new firebase.auth.FacebookAuthProvider();
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
      this.fb.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential).then( (success) => {
          console.log('Info facebook: '+ JSON.stringify(success));
          this.router.navigate(['/perfil']);
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
        this.authService.actualizarUsuario(success.user)
        this.router.navigate(['/perfil']);
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

    googleLogin(){
      if(this.platform.is('cordova')){
          console.log('platform: cordova')
          this.googleCordova();
          
      } else {
          console.log('platform: web')
          this.googleWeb();
          
      }
    }

    googleCordova(){
      this.fb.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential).then( (success) => {
          console.log('Info google: '+ JSON.stringify(success));
          this.router.navigate(['/perfil']);
        }).catch((error) => {
          console.log('Error: '+ JSON.stringify(error));
        });
      }).catch((error) => {
        console.log(error);
      });
    }

    googleWeb(){
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((success) => {
        console.log('Info Google '+ JSON.stringify(success));
        this.authService.actualizarUsuario(success.user);
        this.router.navigate(['/perfil']);
      }).catch((error) => {
        console.log('Error: '+ JSON.stringify(error))
      })
    }

  OnSubmitLogin(){
    this.authService.login(this.email, this.password).then(res => {
      this.router.navigate(['/perfil']);
    }).catch(err => alert("Correo o contraseña incorrecta"))
  }

}
