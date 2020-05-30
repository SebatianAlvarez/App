import { Component, OnInit } from '@angular/core';
import { AuthService, Usuario } from '../../servicios/auth.service';
import { RestaurantesService, promos, platos, resta } from '../../servicios/restaurantes.service';
import { ModalController } from '@ionic/angular';
import { PerfilResComponent } from '../perfil-res/perfil-res.component';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  public Restaurantes : resta[]
  public Promos : promos[] 
  public Platos : platos[] 

  constructor(private authservice: AuthService, public restaurantesService: RestaurantesService,
    private modal: ModalController,public actionSheetController: ActionSheetController,
    private router:Router) { }

  ngOnInit() { 
    this.restaurantesService.getRestaurantes().subscribe( resta => {
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
  }

}
