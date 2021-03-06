import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { RestaurantesService, } from '../../servicios/restaurantes.service';
import { ModalController } from '@ionic/angular';
import { PerfilResComponent } from '../perfil-res/perfil-res.component';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

import { promos } from '../../models/promos-interface';
import { resta } from '../../models/restaurante-interface';

import { almuerzo } from '../../models/almuerzo-interface';
import { desayuno } from '../../models/desayuno-interface';

import { AlmuerzoService } from '../../servicios/almuerzo.service'
import { MeriendaService } from '../../servicios/merienda.service'
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { PromocionService } from '../../servicios/promocion.service';

import { PerfilesService } from '../../servicios/perfiles.service'
import { especial } from '../../models/especial-interface';
import { DesayunoService } from '../../servicios/desayuno.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ListadoPromoComponent } from '../listado-promo/listado-promo.component';
import { Usuario } from '../../models/usuario-interface';
import { CoordenadasService } from '../../servicios/coordenadas.service';
import { coordenadas } from '../../models/coordenadas-interface';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  // public Restaurantes : resta[]
  restaurante$: Observable<resta[]>;
  resHabilitados: resta[] = []; 
  promoHabilitados: promos[] = [];
  promoHabilitado2: Observable<promos[]>;
  
  
  resHabilitados2: resta[] = []; 


  // busqueda
  public resList: any[];


  public Promos : promos[]
   

  promociones$: Observable<promos[]>;
  promociones: promos;

  public usuarioLog : string

  listPromo: any[] = [];

  promoL: promos[] = [];
  promoLO: Observable<promos[]>;


  public desayunos : desayuno[]
  public almuerzos: almuerzo[]
  public especial: especial[]
  public coordenada: coordenadas[]
  public promo: promos[]
  public resta: resta[]
  public usuarios: Usuario[]


  slideOpts = {
    initialSlide: 2,
    speed: 500
  };


  constructor(private authservice: AuthService, public restaurantesService: RestaurantesService,
    private modal: ModalController, public actionSheetController: ActionSheetController,
    private router:Router, private AFauth : AngularFireAuth, private desayunoService : DesayunoService, private especialService: MeriendaService,
    private almuerzoService : AlmuerzoService, private promocionesService: PromocionService,
    private perfilService : PerfilesService, private firestore: AngularFirestore,
    private coordenadaService: CoordenadasService, private alercontroller : AlertController, private localNotification: LocalNotifications) { }

  async ngOnInit() {

    
    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }

    

    this.perfilService.getUsuario(this.usuarioLog).subscribe(data =>{
      if(data.roles === "dueño"){
        window.location.replace('/perfil')
        //this.router.navigate(['/perfil'])
        //window.location.reload()
      }else if(data.roles ==="admin"){
        this.presentarMensaje();
      }
    })

    this.Notificiacion21();
    this.Notificiacion41();

    this.resList = await this.initializeItems();  

    // De esta manera evito poner los NgIf en el HTML
    this.restaurantesService.listar().subscribe(x =>{
      this.resHabilitados = []
      x.forEach(element => {
        if(element['resVerificado'] === 'Aprobado'){
          // console.log("xxx", element);
          this.resHabilitados.push(element)
        }else{
          // console.log("no", element);
        }
      });
      console.log("array", this.resHabilitados);
    })

    this.promocionesService.listar().subscribe(x =>{
      this.promoHabilitados = [];
      x.forEach(element => {
        if(element.estado === 'verdadero'){
          this.promoHabilitados.push(element);
          console.log(this.promoHabilitados);
        }
      });
    })

    this.resHabilitados = await this.initializeItems();

    this.desayunoService.listar().subscribe(desa => {
      this.desayunos = desa;
    })
    
    this.almuerzoService.listar().subscribe(almu =>{
      this.almuerzos = almu;
    })

    this.especialService.listar().subscribe(espe => {
      this.especial = espe;
    })

    this.promocionesService.listar().subscribe(promo =>{
      this.Promos = promo;
    })

    this.coordenadaService.listar().subscribe(coor =>{
      this.coordenada =  coor;
    })

    this.restaurantesService.listar().subscribe(res =>{
      this.resta = res;
    })

    this.restaurantesService.restaurantesHabilitados();

    this.promociones$ = this.promocionesService.recuperarDatos();


  }

  async presentarMensaje(){
    const alert = await this.alercontroller.create({
      header:'Rol incorrecto',
      message: 'No tienes permisos para ingresar en la APP',
      buttons : [
        {
          text : "OK",
          handler :() =>{
            this.router.navigate(['/home'])
          }
        }
      ]
    })
    await alert.present()
    let result = await alert.onDidDismiss();
  }



  async initializeItems(): Promise<any> {

    
    const restaList = await this.firestore.collection('perfiles')
      .valueChanges().pipe(first()).toPromise();
      // console.log("que es esto", restaList);
      this.resHabilitados2 = []
      restaList.forEach(element => {
        if(element['resVerificado'] === 'Aprobado'){
          // console.log("xxx", element);
          this.resHabilitados2.push(element)
        }else{
          // console.log("no", element);
        }
      
      });
      // console.log("aaa", this.resHabilitados2);
      
      return this.resHabilitados2;

      
  }

  async filterList(evt) {
    this.resList = await this.initializeItems();
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.resList = this.resList.filter(Food => {
      if (Food.nombreRestaurante && searchTerm) {
        return (Food.nombreRestaurante.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || Food.tipoRestaurante.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1  );
      }
    });
  }

  async filterList2(evt) {
    this.resHabilitados = await this.initializeItems();
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.resHabilitados = this.resHabilitados.filter(currentFood => {
      if (currentFood.nombreRestaurante && searchTerm) {
        return (currentFood.nombreRestaurante.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentFood.tipoRestaurante.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  restaurantesHabilitados(){
    this.resHabilitados = [];
    this.restaurantesService.recuperarDatos()
      .subscribe(
        data =>{
          for(let key$ in data){
            let habilitados = data[key$];
            if(habilitados['resVerificado'] === 'Aprobado'){
              this.resHabilitados.push(habilitados);
            }
          }
          this.resHabilitados2 = this.resHabilitados;
        }
      )
  }

  Notificiacion41(){
    this.localNotification.schedule({
      id:41,
      title: 'Revisa las promociones del día de hoy.',
      text: 'Consulta si tus restaurantes favoritos cuentan con promociones que te gusten.',
      data: {mydata: 'Mensaje oculto'},
      trigger: { 
        count: 1,
        every: {hour: 12, minute: 0} 
      },
      foreground: true
    })  
  }

  Notificiacion21(){
    this.localNotification.schedule({
      id:21,
      title: 'Revisa los munús del día de hoy',
      text: 'Los restaurantes aledaños a la EPN tienen nueva información.',
      data: {page: 'perfil'},
      trigger: {
        count: 2,
        every: {hour: 12, minute: 30} 
      },
      foreground: true
    })
    
  }



  openRes(res){
    this.modal.create({
      component: PerfilResComponent,
      componentProps : {
        res: res,
        desayuno: this.desayunos,
        almuerzo: this.almuerzos,
        especial: this.especial,
        usuario: this.usuarios,
        promocion: this.Promos,
        coordenada: this.coordenada

      }
    }).then((modal) => modal.present())
  }

  openPromo(pro){
    this.modal.create({
      component: ListadoPromoComponent,
      componentProps : {
        pro: pro,
        resta: this.resta, 
        especial: this.especial,
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
        // console.log("lleng", data.length);
        if(promos['estado'] === "verdadero" && i < 10){
          this.promoL.push(promos)
        }else{
        }
        i  = i + 1;
        console.log();
      }
      // console.log("a ver", this.promoL);

    })
  }

  async presentActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Mi Perfil',
        icon: 'person',
        handler: () => {
          this.router.navigate(['/perfil'])
        }
      },
      {
        text: 'Restaurantes Afiliados',
        icon: 'restaurant',
        handler: () => {

          this.router.navigate(['/tasb-afiliados/Aprobados'])
        }
      },{
        text: 'Reservas',
        icon: 'mail',
        handler: () => {
          this.router.navigate(['tabs-reservas/reserva'])
        }
      },{
        text: 'Mis Sugerencias',
        icon: 'medkit',
        handler: () => {
          this.router.navigate(['tabs-quejas-usu/pendientes'])
        }
      },{
        text: 'Cerrar Sesión',
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


