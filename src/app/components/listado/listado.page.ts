import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { RestaurantesService, } from '../../servicios/restaurantes.service';
import { ModalController } from '@ionic/angular';
import { PerfilResComponent } from '../perfil-res/perfil-res.component';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { promos } from '../../models/promos-interface';
import { resta } from '../../models/restaurante-interface';

import { almuerzo } from '../../models/almuerzo-interface';
import { desayuno } from '../../models/desayuno-interface';
import { merienda } from '../../models/merienda-interface';

import { AlmuerzoService } from '../../servicios/almuerzo.service'
import { MeriendaService } from '../../servicios/merienda.service'
import { MenuService } from '../../servicios/menu.service'
import { Observable } from 'rxjs';
import { PromocionService } from '../../servicios/promocion.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  // public Restaurantes : resta[]
  restaurante$: Observable<resta[]>;

  public Promos : promos[]
   

  promociones$: Observable<promos[]>;
  promociones: promos;

  public usuarioLog : string

  listPromo: any[] = [];

  promoL: promos[] = [];


  public desayunos : desayuno[]
  public almuerzos: almuerzo[]
  public meriendas: merienda[]


  constructor(private authservice: AuthService, public restaurantesService: RestaurantesService,
    private modal: ModalController, public actionSheetController: ActionSheetController,
    private router:Router, private AFauth : AngularFireAuth, private desayunoService : MenuService,
    private almuerzoService : AlmuerzoService, private meriendaService : MeriendaService, private promocionesService: PromocionService) { }

  ngOnInit() { 

    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;

    this.restaurante$ = this.restaurantesService.recuperarDatos();
    this.promociones$ = this.promocionesService.recuperarDatos();

    // this.promocionesService.listar().subscribe(data =>{
    //   console.log(data);
    //   const contador = 0;
    //   for(let pro of data){
    //     console.log(pro);
    //   }
      
    // })

    this.getPromos();
    
    
    // this.restaurantesService.getResta().subscribe( resta => {
    //   this.Restaurantes = resta;
    //   console.log("resta:", resta); 
    // })

    // this.restaurantesService.getPromos().subscribe(promo => {
    //   this.Promos = promo;
    // })

    // this.desayunoService.getDesas().subscribe(desa => {
    //   this.desayunos = desa;
    // })
    
    // this.almuerzoService.getAlmu().subscribe(almu =>{
    //   this.almuerzos = almu;
    // })

    // this.meriendaService.getMeri().subscribe(meri => {
    //   this.meriendas = meri
    // })

  }

  openRes(res){
    this.modal.create({
      component: PerfilResComponent,
      componentProps : {
        res: res,
        desayuno: this.desayunos,
        almuerzo: this.almuerzos,
        merienda: this.meriendas,
        
      }
    }).then((modal) => modal.present())
  }

  onLogout(){
    this.authservice.logout();
  }

  verMas(){
    this.router.navigate(['/lista-promociones-habilitadas']);
  }

  getPromos(){
    this.promoL =[];

    this.promocionesService.listar().subscribe(data =>{
      let i = 0;
      for (let key$ in data){ 
        let promos = data[key$];
        console.log("lleng", data.length);
        
        if(promos['estado'] === "verdadero" && i < 10){
          this.promoL.push(promos);
        }else{
          console.log("no");
        }
        i  = i + 1;
        console.log();
        
      }
      console.log("a ver", this.promoL);

    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
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

}
