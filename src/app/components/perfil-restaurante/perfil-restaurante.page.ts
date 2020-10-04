import { Component, OnInit } from '@angular/core';
import { resta } from '../../models/restaurante-interface';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';



@Component({
  selector: 'app-perfil-restaurante',
  templateUrl: './perfil-restaurante.page.html',
  styleUrls: ['./perfil-restaurante.page.scss'],
})
export class PerfilRestaurantePage implements OnInit {

  public restaurantes: resta[];
  public usuarioLog:string;
  public UsuarioId = null;
  restaurante$: Observable<resta[]>;




  constructor(private restauranteService : RestaurantesService, public actionSheetController: ActionSheetController,
              private AFauth : AngularFireAuth, private authservice: AuthService) { }

  ngOnInit() {

    this.restaurante$ = this.restauranteService.recuperarDatos();

    // this.restauranteService.getRestaurantes().subscribe(data => {
    //   this.restaurantes = data
    // });

    try {
      let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;

    this.UsuarioId = this.usuarioLog
      
    } catch (error) {
      console.log(error)
    }
  }

  async presentActionSheet() {
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
  }

  onLogout(){
    this.authservice.logout();
  }

}
