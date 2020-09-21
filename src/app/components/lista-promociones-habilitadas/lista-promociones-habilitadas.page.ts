import { resta } from './../../models/restaurante-interface';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { promos } from '../../models/promos-interface';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { PromocionService } from '../../servicios/promocion.service';
import { PerfilResComponent } from '../perfil-res/perfil-res.component';


@Component({
  selector: 'app-lista-promociones-habilitadas',
  templateUrl: './lista-promociones-habilitadas.page.html',
  styleUrls: ['./lista-promociones-habilitadas.page.scss'],
})
export class ListaPromocionesHabilitadasPage implements OnInit {

  restaurante$: Observable<resta[]>;
  promociones$: Observable<promos[]>;
  public promocion: promos[]
  


  constructor(private router:Router,
              private authservice:AuthService,
              public ActionSheetController: ActionSheetController,
              private promocionesService: PromocionService,
              public restaurantesService: RestaurantesService,
              private modal: ModalController) { }

            
  ngOnInit() {
    
  
    this.restaurante$ = this.restaurantesService.recuperarDatos();
    this.promociones$ = this.promocionesService.recuperarDatos();

    this.promocionesService.listar().subscribe(promo =>{
      this.promocion = promo;
    })

       
  }

  onLogout(){
    this.authservice.logout();
  }

  async presentActionSheet() {
    const actionSheet = await this.ActionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Mensajes',
        icon: 'mail',
        handler: () => {
          this.router.navigate(['/mensajes'])
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

  openRes(res){
    this.modal.create({
      component: PerfilResComponent,
      componentProps : {
        res: res,
        promocion: this.promocion
      }
    }).then((modal) => modal.present())
  }
}
