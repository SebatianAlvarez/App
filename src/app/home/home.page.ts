import { Component} from '@angular/core';
import { AuthService } from '../servicios/auth.service'; 
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';

//librerias para el uso Firebase

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  providerFb: firebase.auth.FacebookAuthProvider;

  public email:string;
  public password:string;

  constructor(private authSercive: AuthService, public router: Router, public afBD: AngularFireDatabase,
    public afAuth : AngularFireAuth, private fb: Facebook, public platform: Platform) {

      this.providerFb = new firebase.auth.FacebookAuthProvider();
    }

    FacebookLogin(){
      if(this.platform.is('cordova')){
          console.log('platform: cordova')
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
          console.log('Info Facebook: '+ JSON.stringify(success));
          this.router.navigate(['/listado']);
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
        this.router.navigate(['/listado']);
      }).catch((error) => {
        console.log('Error: '+ JSON.stringify(error))
      })
    }

  OnSubmitLogin(){
    this.authSercive.login(this.email, this.password).then(res => {
      this.router.navigate(['/listado']);
    }).catch(err => alert("Correo o contraseña incorrecta"))
  }

}
