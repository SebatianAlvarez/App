import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { PerfilesService } from '../../servicios/perfiles.service';

import { Reserva } from '../../models/reserva-interface'
import { platos } from '../../models/platos-interface';
import { resta } from '../../models/restaurante-interface';
import { Usuario } from '../../models/usuario-interface';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker} from 'leaflet';
import {NativeGeocoder,NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";

import { RestaurantesService } from '../../servicios/restaurantes.service';

import { PreguntasService } from '../../servicios/preguntas.service';
import { pregunta } from '../../models/preguntas';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { PromocionService } from '../../servicios/promocion.service';
import { afiliado } from '../../models/afiliados-interface';

import { almuerzo } from '../../models/almuerzo-interface';
import { desayuno } from '../../models/desayuno-interface';


import 'leaflet-routing-machine';
import * as L from 'leaflet';



import { especial } from '../../models/especial-interface';
import { promos } from '../../models/promos-interface';
import { Observable } from 'rxjs';
import { ComentariosService } from '../../servicios/comentarios.service';
import { comentarios } from '../../models/comentarios-interface';
import { CoordenadasService } from '../../servicios/coordenadas.service';
import { coordenadas } from '../../models/coordenadas-interface';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

import { DesayunoService } from '../../servicios/desayuno.service';
import { AlmuerzoService } from '../../servicios/almuerzo.service';
import { MeriendaService } from '../../servicios/merienda.service';

@Component({
  selector: 'app-perfil-res',
  templateUrl: './perfil-res.component.html',
  styleUrls: ['./perfil-res.component.scss'],
})
export class PerfilResComponent implements OnInit {

  form: FormGroup;

  public res : resta
  public desayunos : desayuno[]
  public almuerzos: almuerzo[]
  public especial: especial[]
  public promocion: promos[]
  public usu: Usuario[]
  public coor: coordenadas

  public promosUsuario: promos[] =[]
  slideOpts: any

  public resID : string

  public usuarioLog : string;
  public UsuarioRoles : Usuario[]

  public rolActual : string;

  fotosRef: AngularFirestoreCollection;


  public mostarMapa : boolean = false

  private map;
  marker: any;
  latLong = [];
  address: string[];
  L : any

  public restaurantes: any;
  public preguntas : pregunta[];
  public afiliados : afiliado[]
  public afi : afiliado
  public coordenadas: coordenadas[]= [];
  public latitud : number
  public longitud :  number

  desayunosRespectivos: desayuno[] = [];
  almuerzosRespectivos: almuerzo[] = [];
  almuerzosRespectivos2: almuerzo[] = [];
  especialesRespectivos: especial[] = [];

  validacion: boolean = true;
  validacionA: boolean = false;
  validacionB: boolean = true;

  public afiliados$: Observable<afiliado[]>;

  public comentarios$: Observable<comentarios[]>;

  public coordenadas$: Observable<coordenadas[]>;

  selectedFile: any;
  file: string;
  estaSeleccionado: boolean;

  // Variables para ocultar información
  informacion: boolean;
  desayuno: boolean;
  almuerzo: boolean;
  especiales: boolean;
  promociones: boolean;
  comentarios: boolean;
  afiliar: boolean;

  // variables para validar si el usuario esta afiliado al restaurante
  listAfiliados: afiliado[] = [];
  listRestaurant: resta[] = [];
  existeA: boolean;
  existeAlmu: boolean;
  existeDes: boolean;
  existeEsp: boolean;
  existePromo: boolean;

  constructor( private navparams: NavParams, private modal:ModalController, private authservice: AuthService,
    public actionSheetController: ActionSheetController, private router:Router, private AFauth : AngularFireAuth,
    private db: AngularFirestore, private alertController : AlertController, private perfilService : PerfilesService,
    private geolocation: Geolocation, private restauranteService : RestaurantesService, private preguntasService : PreguntasService,
    private afiliadosService : AfiliadosServiceService, private geocoder: NativeGeocoder,
    private formBuilder: FormBuilder, private comentariosService: ComentariosService,
    private coordenadaService: CoordenadasService, private storage : AngularFireStorage,
    private desayunoService  : DesayunoService, private almuerzoService : AlmuerzoService, private especialesService: MeriendaService,
    private promocionService: PromocionService)

    {
      this.fotosRef = this.db.collection('afiliados')
     }

    public calificar = this.formBuilder.group ({

      id: new FormControl (''),
      estrellas: new FormControl ('', [Validators.required ]),

    });

    public afiliacion = this.formBuilder.group ({

      id: new FormControl (''),
      inputFile: new FormControl ('', [Validators.required ]),

    });


  ngOnInit() {

    this.existeA = false;
    this.existeAlmu = false;
    this.existeDes = false;
    this.existeEsp = false;
    this.existePromo = false;

    this.informacion = true;
    this.desayuno = false;
    this.almuerzo = false;
    this.especiales = false;
    this.promociones = false;
    this.comentarios = false;
    this.afiliar = false;

    this.res = this.navparams.get('res')
    this.desayunos = this.navparams.get('desayuno')
    this.almuerzos = this.navparams.get('almuerzo')
    this.especial = this.navparams.get('especial')
    this.promocion = this.navparams.get('promocion')
    this.usu = this.navparams.get('usuario')
    this.coor = this.navparams.get('coordenada')

    console.log("aver " + this.almuerzos)
    console.log("aver especial" + this.especial)
    console.log("aver usu" + this.usu)
    console.log("promc??", this.promocion);



    this.preguntasService.getPreguntas().subscribe(data =>{
      this.preguntas = data
    })

    this.afiliados$ = this.afiliadosService.recuperarDatos()

    this.comentarios$ = this.comentariosService.recuperarDatos()

    this.coordenadas$ = this.coordenadaService.recuperarDatos()

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;

    } catch (error) {
      console.log(error)
    }

    this.afiliadosService.listar().subscribe(data =>{
      this.listAfiliados =[];
      this.listRestaurant = [];
      data.forEach(elementA =>{
        if(this.usuarioLog === elementA.uidUsu && elementA.idres === this.res.id){
          this.listAfiliados.push(elementA);
          // this.listRestaurant.push(this.res);
          // console.log("res,", this.listRestaurant);
          console.log("afil", this.listAfiliados);
          console.log("res", this.res);
          this.existeA = true;
          this.existeAfiliacion(this.existeA);
        }
      })
    });

    this.almuerzoService.listar().subscribe(x =>{
      this.almuerzosRespectivos = [];
      x.forEach(element => {
        //console.log("q tiene" + x)
        if(element['userUID'] === this.res.userUID){
          console.log("aca" + element);
          this.almuerzosRespectivos.push(element)
          this.existeAlmu = true;
          this.existeAlmuerzo(this.existeAlmu);

        }else{
          //console.log("no", element);
        }
      });
      //console.log("array", this.desayunosRespectivos);
    })

      this.desayunoService.listar().subscribe(x =>{
      this.desayunosRespectivos = []
      x.forEach(element => {
        if(element['userUID'] === this.res.userUID){
          this.desayunosRespectivos.push(element)
          this.existeDes = true;
          this.existeDesayuno(this.existeDes)
        }else{
          //console.log("no", element);
        }
      });
      //console.log("array", this.desayunosRespectivos);
    })

    this.especialesService.listar().subscribe(x =>{
    this.especialesRespectivos = []
      x.forEach(element => {
        if(element['userUID'] === this.res.userUID){
          this.especialesRespectivos.push(element)
          this.existeEsp = true;
          this.existeespecial(this.existeEsp)
        }else{
        }
      });
      //console.log("array", this.desayunosRespectivos);
    })

    this.promocionService.listar().subscribe(x =>{
      this.promosUsuario = [];
      x.forEach(element => {
        if(element['userUID'] === this.res.userUID && element['estado'] === 'verdadero' ){
        this.promosUsuario.push(element);
        this.existePromo = true;
        this.existePromocion(this.existePromo);
        console.log("promos??",this.promosUsuario)
      }
      });

    })

    // this.promocionesUsuario();
    // this.desayunosQueSon();
    // this.almuerzosQueSon();
    // this.especialesQueSon();
    // this.cargarMapa();
  }

  mostrarInformacion(){
    this.informacion = true;
    this.desayuno = false;
    this.almuerzo = false;
    this.especiales = false;
    this.promociones = false;
    this.comentarios = false;
    this.afiliar = false;

    this.ionViewDidEnter();
  }

  cargarMapa(){
    this.ionViewDidEnter();
  }

  mostrarDesayuno(){
    this.informacion = false;
    this.desayuno = true;
    this.almuerzo = false;
    this.especiales = false;
    this.promociones = false;
    this.comentarios = false;
    this.afiliar = false;
  }

  mostrarAlmuerzo(){
    this.informacion = false;
    this.desayuno = false;
    this.almuerzo = true;
    this.especiales = false;
    this.promociones = false;
    this.comentarios = false;
    this.afiliar = false;


  }

  mostrarEspecial(){
    this.informacion = false;
    this.desayuno = false;
    this.almuerzo = false;
    this.especiales = true;
    this.promociones = false;
    this.comentarios = false;
    this.afiliar = false;


  }

  mostrarPromocion(){
    this.informacion = false;
    this.desayuno = false;
    this.almuerzo = false;
    this.especiales = false;
    this.promociones = true;
    this.comentarios = false;
    this.afiliar = false;


  }

  mostrarComentarios(){
    this.comentarios = true;
    this.informacion = false;
    this.desayuno = false;
    this.almuerzo = false;
    this.especiales = false;
    this.promociones = false;
    this.afiliar = false;

  }

  mostrarBotonAfiliar(){
    this.comentarios = false;
    this.informacion = true;
    this.desayuno = false;
    this.almuerzo = false;
    this.especiales = false;
    this.promociones = false;
    this.afiliar = true;
  }

  ocultarBotonAfiliar(){
    this.comentarios = false;
    this.informacion = true;
    this.desayuno = false;
    this.almuerzo = false;
    this.especiales = false;
    this.promociones = false;
    this.afiliar = false;
  }


  // promocionesUsuario(){
  //   this.promosUsuario = [];
  //   this.promocion.forEach(element => {
  //     if(element['userUID'] === this.res.userUID && element['estado'] === 'verdadero' ){
  //       this.promosUsuario.push(element);
  //     }
  //   });
  // }



  marcador(lat : number, lng : number){
    this.marker = L.marker([lat, lng], {draggable:false});
    this.marker.addTo(this.map).bindPopup('Mi restaurante');
  }

  async verCoordenadas(){
    this.coordenadaService.listar().subscribe( data =>{

      for(let element of data){
        if(element.userUID ===  this.res.userUID){
          this.latitud = element['lat'];
          this.longitud = element['lng'];
          this.marcador(this.latitud, this.longitud); // Aqui agrego el pop-up con las coordenadas de la base de datos`
        }
      }
    })

  }


  ionViewDidEnter(){
        this.map = L.map('Mapa', {
          center: [ -0.2104022, -78.4910514 ],
          zoom: 15
        });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      tiles.addTo(this.map);
      this.verCoordenadas();
}

  Calificacion(){
    const valores = this.calificar.value
    let x = valores['estrellas']

    console.log("aver " + x)
  }

  existeAfiliacion(valor:boolean){
    if(valor){
      return true;

    }else{
      return false;
    }
  }

  existeAlmuerzo(valor:boolean){
    if(valor){
      return true;

    }else{
      return false;
    }
  }

  existeDesayuno(valor:boolean){
    if(valor){
      return true;

    }else{
      return false;
    }
  }

  existeespecial(valor:boolean){
    if(valor){
      return true;

    }else{
      return false;
    }
  }

  existePromocion(valor:boolean){
    if(valor){
      return true;

    }else{
      return false;
    }
  }

  elegirImagen(event){
    this.estaSeleccionado = true;
    this.file = event.target.files[0].name;

    this.selectedFile = event.target.files
  }

  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {

        const task = await this.storage.ref('imagenesAfiliacion').child(id).put(file[0])
        return this.storage.ref(`imagenesAfiliacion/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  afiliarse(){
    this.validacionA = true;
    let afi = new afiliado();

  return new Promise<any>((resolve, reject) => {

    let afiliadoID = this.db.createId();
    afi.id = afiliadoID;
    let usuario = this.perfilService.getUsuario(this.usuarioLog);
    usuario.subscribe(data =>{
      this.fotosRef.add({

      }).then(async resp =>{

        const imageUrl = await this.uploadFile(resp.id, this.selectedFile)

        this.db.collection('afiliados').doc(afiliadoID).set({
          uidUsu : this.usuarioLog,
          uidResta : this.res.userUID,
          id : afi.id,
          nombre : data.nombre,
          numero : data.numero,
          estado : "pendiente",
          idres : this.res.id,
          fotoAfi: imageUrl
        }).then((res) =>{
          resolve(res)
        }).catch(err => reject(err))

      })

    })

  })
}

existeAfiliado(){
  this.afiliadosService.listar().subscribe(data=>{
    for(let a of data){
      if(this.usuarioLog === a.uidUsu){

      }
    }
  })
}


  async presentarMensaje(){
    const alert = await this.alertController.create({
      header:'Deseas afiliarte a este restaurante',
      subHeader:'Que beneficios obtienes',
      message: 'Podras realizar reservas si estas afiliado al restaurante',
      buttons : [
        {
          text : "Cancelar",
          role : "cancel",
          cssClass : "secondary",
          handler: () =>{

          }
        },{
          text : "Afiliarse",
          handler :() =>{
            this.afiliarse()
            this.goRegreso()

            this.router.navigate(['/tasb-afiliados/Pendientes'])
          }
        }
      ]
    })
    await alert.present()
    let result = await alert.onDidDismiss();
  }


  async presentModal(){
    const alert = await this.alertController.create({
      header: 'Realizar Reserva',
      inputs: [
        {
          name: "mesas",
          type: "text",
          placeholder: "Mesas a Reservar"
        },{
          name: "tiempo",
          type: "number",
          placeholder: "Tiempo estimado para llegar"
        }
      ],
      buttons : [
        {
          text : "Cancelar",
          role : "cancel",
          cssClass : "secondary",
          handler: () =>{

          }
        },{
          text : "Confirmar Reserva",
          handler : data =>{
            this.Reservar(data.mesas, data.tiempo);
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
  }


  goRegreso(){
    this.modal.dismiss();
  }

  goMapa(){
    this.modal.dismiss(this.router.navigate(['/mapa']));
  }

  goReserva(){
    this.modal.dismiss(this.router.navigate(['/formulario-reserva']));
  }

  goPeticion(){
    this.modal.dismiss(this.router.navigate(['/reserva']));
  }

  goMenu(){
    this.modal.dismiss(this.router.navigate(['/menu']));
  }

  goPerfil(){
    this.modal.dismiss(this.router.navigate(['/perfil']));
  }

  goActualizarperfil(){
    this.modal.dismiss(this.router.navigate(['/actualizar-perfil']))
  }

  goMensajes(){
    this.modal.dismiss(this.router.navigate(['/tabs-reservas/reserva']))
  }

  onLogout(){
    this.authservice.logout();
  }

  goAfiliados(){
    this.modal.dismiss(this.router.navigate(['/tabs-restaurantes-afiliados/afiliados']))
  }

  getMenu(){

    this.authservice.getUsuario().subscribe(data =>{
      data.forEach((usuario: Usuario) => {

        if (this.usuarioLog == usuario.uid){
          this.UsuarioRoles = [usuario]
          for(let user of this.UsuarioRoles){
            this.rolActual = user.roles
            this.presentActionSheet(this.rolActual.toString())
          }
        }
      })
    })
  }

 async presentActionSheet(rol :string) {

  const actionSheet = await this.actionSheetController.create({
    header: 'Menu',
    buttons: [{
      text: 'Mi Perfil',
      icon: 'person',
      handler: () => {
        this.goPerfil();
      }
    },{
      text: 'Restaurantes Afiliados',
      icon: 'restaurant',
        handler: () => {
         this.goAfiliados();
        }
    },{
      text: 'Reservas',
      icon: 'mail',
      handler: () => {
        this.goMensajes();
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

Reservar(mesa : string, tiempo: string ){

  let reserva = new Reserva();

  return new Promise<any>((resolve, reject) => {

    let reservaID = this.db.createId();
    reserva.uid = reservaID;
    let usuario = this.perfilService.getUsuario(this.usuarioLog);
    usuario.subscribe(data =>{
      this.db.collection('reservas').doc(reservaID).set({
        uidUsu : this.usuarioLog,
        uidResta : this.res.userUID,
        uid : reserva.uid,
        mesas : mesa,
        tiempo : tiempo,
        nombre : data.nombre,
        numero : data.numero,
        estado : "En Revision"
      }).then((res) =>{
        resolve(res)
      }).catch(err => reject(err))
    })
  })
}

aver(){
  let usuario = this.perfilService.getUsuario(this.usuarioLog);
  usuario.subscribe(data =>{
    console.log("aver : "+ data.nombre)
  })
}


mostrar(id : string, lat: number, lng: number){
  this.restauranteService.getRestaurante(id).subscribe(data =>{
    this.restaurantes = data
    //this.marker = marker([data.latitud,data.longitud], {draggable: false});
      //this.marker.addTo(this.map).bindPopup(data.nombreRestaurante);

      this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((res) =>{
        return this.latLong = [
          res.coords.latitude,
          res.coords.longitude
        ]
      }).then((latLong) =>{

        this.marker = marker(L.latLng(latLong[0],  latLong[1]));

        L.Routing.control({
          show: false,
          waypoints: [
              L.latLng(lat,lng),
              L.latLng(latLong[0],latLong[1])
          ],
          addWaypoints: false,
          routeWhileDragging: false,
          showAlternatives: false,
        }).addTo(this.map);
      //this.marker.addTo(this.map).bindPopup('Estoy aqui');
      this.map.setView(latLong);

      });

  })

}

}