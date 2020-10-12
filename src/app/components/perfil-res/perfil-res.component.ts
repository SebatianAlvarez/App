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

import { Reserva } from 'src/app/models/reserva-interface';
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

  constructor( private navparams: NavParams, private modal:ModalController, private authservice: AuthService,
    public actionSheetController: ActionSheetController, private router:Router, private AFauth : AngularFireAuth,
    private db: AngularFirestore, private alertController : AlertController, private perfilService : PerfilesService,
    private geolocation: Geolocation, private restauranteService : RestaurantesService, private preguntasService : PreguntasService,
    private afiliadosService : AfiliadosServiceService, private geocoder: NativeGeocoder,
    private formBuilder: FormBuilder, private comentariosService: ComentariosService,
    private coordenadaService: CoordenadasService, private storage : AngularFireStorage,
    private desayunoService  : DesayunoService, private almuerzoService : AlmuerzoService, private especialesService: MeriendaService)
    
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

    this.slideOpts = {
      initialSlide: 1,
      speed: 400
    };

    var acc = document.getElementsByClassName("accordion");
    var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("active");
  
      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  } 

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

    //this.afiliadosService.getAfiliados().subscribe(x =>{
    // this.afiliados = x
    //})

    this.afiliadosService.listar().subscribe(data =>{
      for (let x of data){
        if(this.usuarioLog === x['uidUsu'] && x['idres'] === this.res.id){
          console.log(x['uidUsu']);
          console.log("si");
          this.validacion = true;
          this.existeAfiliacion(this.validacion);
        }else{

          console.log("no");
          this.validacion = false;
          this.existeAfiliacion(this.validacion);
        }
      }
    })

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }

    this.promocionesUsuario();
    this.desayunosQueSon();
    this.almuerzosQueSon();
    this.especialesQueSon();

  }

  desayunosQueSon(){
    this.desayunoService.listar().subscribe(x =>{
      this.desayunosRespectivos = []
      x.forEach(element => {
        //console.log("q tiene" + x)
        if(element['userUID'] === this.res.userUID){
           //console.log("aca" + element);
          this.desayunosRespectivos.push(element)
        }else{
          //console.log("no", element);
        }
      });
      //console.log("array", this.desayunosRespectivos);
    })
  }

  almuerzosQueSon(){
    this.almuerzoService.listar().subscribe(x =>{
      this.almuerzosRespectivos = []
      x.forEach(element => {
        //console.log("q tiene" + x)
        if(element['userUID'] === this.res.userUID){
           //console.log("aca" + element);
          this.almuerzosRespectivos.push(element)
        }else{
          //console.log("no", element);
        }
      });
      //console.log("array", this.desayunosRespectivos);
    })
  }

  especialesQueSon(){
    this.especialesService.listar().subscribe(x =>{
      this.especialesRespectivos = []
      x.forEach(element => {
        //console.log("q tiene" + x)
        if(element['userUID'] === this.res.userUID){
           //console.log("aca" + element);
          this.especialesRespectivos.push(element)
        }else{
          //console.log("no", element);
        }
      });
      //console.log("array", this.desayunosRespectivos);
    })
  }

  promocionesUsuario(){
    this.promosUsuario = [];
    this.promocion.forEach(element => {
      if(element['userUID'] === this.res.userUID && element['estado'] === 'verdadero' ){
        this.promosUsuario.push(element);
      }
    });
  }

  

  marcador(lat : number, lng : number){
    this.marker = L.marker([lat, lng], {draggable:false});
    this.marker.addTo(this.map).bindPopup('Mi restaurante');
  }
  
  verCoordenadas(){
    this.coordenadaService.listar().subscribe( data =>{
  
      for(let element of data){
        console.log("userUID: ", element.userUID);
        console.log("usrrlog: ", this.usuarioLog);
        console.log("elemente??", element);
        
        if(element.userUID ===  this.res.userUID){
          this.latitud = element['lat'];
          this.longitud = element['lng'];
          
          //var lat = parseFloat(this.latitud);
          //var lon = parseFloat(this.longitud);
          
          this.marcador(this.latitud, this.longitud); // Aqui agrego el pop-up con las coordenadas de la base de datos`
          break;
        }else{
          console.log("no es");
        }
        // break;
      }
    })
  
  }
  

  ionViewDidEnter(){

    //this.coordenadaService.listar().subscribe( data => {
    //  this.coordenadas =  data
    //  this.coordenadas.forEach
    //})

    console.log("coor " + this.coordenadas)

    this.map = L.map('Mapa', {
      center: [ -0.2104022, -78.4910514 ],
      zoom: 17
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

tiles.addTo(this.map);
this.verCoordenadas();

//this.marker = marker([-0.2104022, -78.4910514]);
//this.marker.addTo(this.map)
  }

  Calificacion(){
    const valores = this.calificar.value
    let x = valores['estrellas']

    console.log("aver " + x)
  }

  existeAfiliacion( valor:boolean){
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
    this.modal.dismiss(this.router.navigate(['/mensajes']))
  }

  onLogout(){
    this.authservice.logout();
  }

  goAfiliados(){
    this.modal.dismiss(this.router.navigate(['/restaurantes-afiliados']))
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
      text: 'Mensajes',
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

//dibujar en mapa con en un punto fijo

/*
showMap() {
  
  this.map = L.map('Mapa', {
    center: [ -0.2104022, -78.4910514 ],
    zoom: 100
  });
  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
}
*/

//adquirir coordenadas

//mostrar Popup


        /*
showMarker(latLong){
  this.marker = marker(latLong, {draggable:true});
  this.marker.addTo(this.map).bindPopup('Estoy aqui');
  this.map.setView(latLong);
  this.marker.on("dragend", () =>{
    let pos = this.marker.getLatLng();
    //this.getAddress(pos.lat, pos.lng)
  })
}
        */

/*
getAddress(lat: number, long : number){
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  this.geocoder.reverseGeocode(lat, long, options).then(res =>{
    this.address = Object.values(res[0]).reverse();
  });
}
*/



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

        this.marker = marker(latLong, {draggable: false});

        L.Routing.control({
          show: false,
          waypoints: [
              L.latLng(lat,lng, {draggable: false}),
              L.latLng(latLong[0],latLong[1], {draggable: false})
          ],
          addWaypoints: false,
          routeWhileDragging: false,
          showAlternatives: false,
          language: 'es',
          draggable: false,
        }).addTo(this.map);
      //this.marker.addTo(this.map).bindPopup('Estoy aqui');
      this.map.setView(latLong);
    
      });

  })

}

/*comento para subir al git */

}