import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//librerias mapa

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { firebaseConfig } from '../environments/environment';

//librerias firebase y autenticacion

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth'
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFireDatabase} from '@angular/fire/database/';
import { PerfilResComponent } from './components/perfil-res/perfil-res.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireStorageModule } from '@angular/fire/storage';

import { FCM } from '@ionic-native/fcm/ngx';
  
@NgModule({
  declarations: [AppComponent, PerfilResComponent],
  entryComponents: [PerfilResComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
      AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule, AngularFirestoreModule,
      BrowserAnimationsModule, AngularFireStorageModule],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,AngularFireDatabase,{provide: FirestoreSettingsToken, useValue: {}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
