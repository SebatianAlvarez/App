import { Component, OnInit } from '@angular/core';
import { promos } from '../../models/promos-interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { resta } from '../../models/restaurante-interface'
import { AuthService } from '../../servicios/auth.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { PromocionService } from '../../servicios/promocion.service';


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
    public alertController: AlertController) { 

      this.promosRef = this.db.collection('promociones')
     }

     public foto = this.formBuilder.group ({
      id: new FormControl (''),
      inputFile: new FormControl ('', [Validators.required]),
  
    });

  ngOnInit() {

    
    this.estaSeleccionado = false;
    // this.selectedFile = "";


    this.restaurante$ = this.restauranteService.recuperarDatos();
    this.promociones$ = this.promocionesService.recuperarDatos();

    


    // this.restauranteService.getRestaurantes().subscribe( data => {
    //   this.restaurantes = data
    // })

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
  }

  onLogout(){
    this.authservice.logout();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Promociones Activas',
        icon: 'done-all',
        handler: () => {
          this.router.navigate(['/promo-activa']);
        }
      },{
        text: 'Promociones Ocultas',
        icon: 'eye-off',
        handler: () => {
          this.router.navigate(['/promo-oculta']);
        }
      }, {
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
    this.resetForm()
      
      this.router.navigate(['/promo-activa'])

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
