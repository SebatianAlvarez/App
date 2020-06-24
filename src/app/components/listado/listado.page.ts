import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { RestaurantesService, } from '../../servicios/restaurantes.service';
import { ModalController } from '@ionic/angular';
import { PerfilResComponent } from '../perfil-res/perfil-res.component';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { promos } from '../../models/promos-interface';
import { platos } from '../../models/platos-interface';
import { resta } from '../../models/restaurante-interface';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  public Restaurantes : resta[]
  public Promos : promos[] 
  public Platos : platos[] 
  public usuarioLog : string

  constructor(private authservice: AuthService, public restaurantesService: RestaurantesService,
    private modal: ModalController, public actionSheetController: ActionSheetController,
    private router:Router, private AFauth : AngularFireAuth) { }

  ngOnInit() { 

    let currentUser = this.AFauth.auth.currentUser;
    console.log("mmmmm " + currentUser)
    this.usuarioLog = currentUser.uid;

    this.restaurantesService.getResta().subscribe( resta => {
      this.Restaurantes = resta;
    })

    this.restaurantesService.getPlatos().subscribe(plato => {
      this.Platos = plato;
    })

    this.restaurantesService.getPromos().subscribe(promo => {
      this.Promos = promo;
    })

  }

  openRes(res){
    this.modal.create({
      component: PerfilResComponent,
      componentProps : {
        res: res,
        //promo: this.Promos, todavia toy viendo las fotos de las promos
        plato : this.Platos
  
      }
    }).then((modal) => modal.present())
  }

  onLogout(){
    this.authservice.logout();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Mi Perfil',
        icon: 'person',
        handler: () => {
          this.router.navigate(['/perfil'])
        }
      },{
        text: 'Editar Perfil',
        icon: 'settings',
        handler: () => {
          this.router.navigate(['/actualizar-perfil'])
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
