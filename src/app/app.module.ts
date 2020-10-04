import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


//librerias mapa

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
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

import { ReactiveFormsModule } from '@angular/forms';
import { MenusPrincipalesPage } from './components/menus-principales/menus-principales.page';
  
@NgModule({
  declarations: [AppComponent, PerfilResComponent, MenusPrincipalesPage],
  entryComponents: [PerfilResComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
      AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule, AngularFirestoreModule,
      BrowserAnimationsModule, AngularFireStorageModule, FormsModule, ReactiveFormsModule],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,NativeGeocoder,AngularFireDatabase,{provide: FirestoreSettingsToken, useValue: {}},
  ],
  exports:[MenusPrincipalesPage],
  bootstrap: [AppComponent]
})
export class AppModule {}
