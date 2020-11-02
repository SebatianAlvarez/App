import { Component, OnInit } from '@angular/core';
import { promos } from '../../models/promos-interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { resta } from '../../models/restaurante-interface'
import { AuthService } from '../../servicios/auth.service';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { PromocionService } from '../../servicios/promocion.service';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.page.html',
  styleUrls: ['./promocion.page.scss'],
})
export class PromocionPage implements OnInit {

  promosRef: AngularFirestoreCollection;
  public uploadProgress = 0;
  public promociones : promos[]
  public usuarioLog:string
  selectedFile: any;
  file: string;
  estaSeleccionado: boolean;

  public restaurantes : resta[]
  promoHabilitados: promos[] = []; 


  restaurante$: Observable<resta[]>;
  promociones$: Observable<promos[]>;



  constructor( private storage : AngularFireStorage, 
    private authservice: AuthService,
    public actionSheetController: ActionSheetController, 
    private router:Router,
    private AFauth : AngularFireAuth, 
    private db: AngularFirestore, 
    private restauranteService : RestaurantesService,
    private promocionesService: PromocionService,
    private formBuilder: FormBuilder,
    public alertController: AlertController, 
    private plt: Platform,
    private localNotification: LocalNotifications) { 

      this.promosRef = this.db.collection('promociones')

      // Notificaciones
      this.plt.ready().then(() =>{
        this.localNotification.on('click').subscribe(res =>{
          console.log('click: ', res);
          let msg = res.data ? res.data.mydata: '';
          this.showAlert(res.title, res.text, msg);          
        });

        this.localNotification.on('trigger').subscribe(res =>{
          console.log('trigger: ', res);
          let msg = res.data ? res.data.mydata: '';
          this.showAlert(res.title, res.text, msg); 

        });
      })
     }

     public foto = this.formBuilder.group ({
      id: new FormControl (''),
      inputFile: new FormControl ('', [Validators.required]),
  
    });

  ngOnInit() {
    this.estaSeleccionado = false;

    this.restaurante$ = this.restauranteService.recuperarDatos();
    this.promociones$ = this.promocionesService.recuperarDatos();
    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }

    this.promocionesService.listar().subscribe(x =>{
      this.promoHabilitados = []
      x.forEach(element => {
        if( this.usuarioLog === element['userUID'] && element['estado'] === 'verdadero'){
          console.log("xxx", element);
          this.promoHabilitados.push(element)
        }else{
          console.log("no", element);
        }
      });
      console.log("array", this.promoHabilitados);
    })

    // NOTIFICCION QUE REDIRIGI A UNA PAGINA
    this.Notificiacion2();
    this.Notificiacion4();
    this.Notificiacion5();

  }

  Notificiacion1(){

    this.localNotification.schedule({
      id:1,
      title: 'Existe nuevas promociones',
      text: 'Un restaurante de la zona acaba de subir una promocion, ve a revisarla',
      data: {mydata: 'Prueba'},
      trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
      //foreground: true
    })
  }

  Notificiacion2(){
    this.localNotification.schedule({
      id:2,
      title: 'Notificacion de prueba 12:00',
      text: 'Ejemplo de notificacion',
      data: {page: 'perfil'},
      trigger: {every: {hour: 12, minute: 0} },
      foreground: true
    })
    
  }

  Notificiacion3(){
    console.log("notificacion enviada");
    
    this.localNotification.schedule({
      id:3,
      title: 'Notificacion de 10 segundos, con otro formato de fecha',
      text: 'Ejemplo de notificacion',
      data: {mydata: 'Mensaje oculto'},
      trigger: {at: new Date(new Date().getTime() + 10 * 1000)}
      //foreground: true
    })
    
  }

  Notificiacion4(){
    this.localNotification.schedule({
      id:4,
      title: 'Revisa el menu del dia ',
      text: 'Puedes ver el menu que ofrecen tus restaurantes favoritos el dia hoy',
      data: {mydata: 'Mensaje oculto'},
      trigger: { every: {hour: 12, minute: 10} }
      //foreground: true
    })
    
  }

  Notificiacion5(){
    this.localNotification.schedule({
      id:5,
      title: 'Revisa el menu del dia ',
      text: 'Puedes ver el menu que ofrecen tus restaurantes favoritos el dia hoy',
      data: {mydata: 'Mensaje oculto'},
      trigger: { every: {hour: 19, minute: 40} }
      //foreground: true
    })   
  }

  Notificiacion6(){
    this.localNotification.schedule({
      id:6,
      title: 'Revisa el menú del día ',
      text: 'Puedes ver el menú que ofrecen tus restaurantes favoritos el dia hoy',
      data: {mydata: 'Mensaje oculto'},
      trigger: { every: {hour: 7, minute: 0} }
      //foreground: true
    })   
  }

  Notificiacion7(){
    this.localNotification.schedule({
      id:7,
      title: 'Revisa el menu del dia ',
      text: 'Notificacion cada minuto',
      data: {mydata: 'Mensaje oculto'},
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
      //foreground: true
    })   
  }

  showAlert(header, sub, msg){
    this.alertController.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['OK']
    }).then(alert => alert.present());
  }


  onLogout(){
    this.authservice.logout();
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

  elegirImagen(event){ 
    this.estaSeleccionado = true;
    this.file = event.target.files[0].name;
    
    this.selectedFile = event.target.files
    
    //let fileName = document.getElementById("imagen").nodeValue;
    //let x = fileName.lastIndexOf(".") + 1 ;
    //let extFile = fileName.substr(x, fileName.length).toLowerCase();
    //if (extFile =="jpg" || extFile == "jpeg" || extFile == "png"){
      
      //this.aver()

    //}else{
    //  alert("Solo puede selecionar archivos que sean imagenes")
    // }
  }

  aver(){

    this.promosRef.add({
    })
    .then(async resp => {

      const imageUrl = await this.uploadFile(resp.id, this.selectedFile)

      console.log("aver " + this.selectedFile)

      this.promosRef.doc(resp.id).update({
        id: resp.id,
        fotosPromocion: imageUrl,
        userUID : this.usuarioLog,
        estado: "verdadero"
      })
      console.log("notificacion enviada");
      this.Notificiacion1();
      this.resetForm()
      
      this.router.navigate(['/tabs3/Activas'])

    }).catch(error => {
      console.log(error);
    })
  }

  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
      
        const task = await this.storage.ref('imagenesPromo').child(id).put(file[0])
        return this.storage.ref(`imagenesPromo/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async AlertSubida() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Promoción agregada con éxito',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
    this.aver();

  }

  resetForm() {
    // this.file = null;
    this.estaSeleccionado = false;
  }

}
