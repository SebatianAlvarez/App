import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { ModalController } from '@ionic/angular';
import { PerfilResComponent } from '../perfil-res/perfil-res.component';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuService } from '../../servicios/menu.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  public Restaurantes : any = [];

  constructor(private authservice: AuthService, public restaurantesService: RestaurantesService,
    private modal: ModalController,public actionSheetController: ActionSheetController, private router:Router,
    private menuService : MenuService ) { }

  ngOnInit() { 
    this.restaurantesService.getRestaurantes().subscribe( resta => {
      this.Restaurantes = resta;
    })
  }

  openRes(res){
    this.modal.create({
      component: PerfilResComponent,
      componentProps : {
        res: res
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
        text: 'Editar Perf',
        icon: 'settings',
        handler: () => {
          
        }
      }, {
        text: 'Cerrar Sesion',
        icon: 'close',
        role: 'logout',
        handler: () => {
         this.onLogout();
        }
      }]
    });
    await actionSheet.present();
  }

}
