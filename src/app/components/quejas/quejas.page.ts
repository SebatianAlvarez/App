import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { afiliado } from '../../models/afiliados-interface';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { queja } from '../../models/quejas-interface';
import { AngularFirestore} from '@angular/fire/firestore';
import { PerfilesService } from '../../servicios/perfiles.service';
import { resta } from './../../models/restaurante-interface';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { first } from 'rxjs/operators';
import { ComentariosService } from '../../servicios/comentarios.service';


@Component({
  selector: 'app-quejas',
  templateUrl: './quejas.page.html',
  styleUrls: ['./quejas.page.scss'],
})
export class QuejasPage implements OnInit {

  restaurante$: Observable<resta[]>;
  afiliados$: Observable<afiliado[]>;

  // busqueda
  public resList: any[];

  suma : number = 0
  auxi : number = 0

  // variable para validar si hay datos
  existeDatos: boolean;
  listAfiliados: afiliado[] = []
  listRestaurantes: resta[] = []

  usuarioLog: string;
  constructor(private afiliadosSvc: AfiliadosServiceService, public actionSheetController: ActionSheetController,
              private restauranteService: RestaurantesService, private alertController : AlertController,
              private AFauth : AngularFireAuth, private db: AngularFirestore,private formBuilder: FormBuilder,
              private router : Router, private perfilService : PerfilesService,
              private comentarioService : ComentariosService,
              public ActionSheetController: ActionSheetController, private authservice:AuthService,) { 
              }

              public errorMensajes ={
                tipo : [
                  { type: 'required', message: 'Este campo no puede estar vacio' },
                ],
                detalle : [
                  { type: 'required', message: 'Este campo no puede estar vacio' },
                ]
              };


public queja = this.formBuilder.group ({
       id: new FormControl (''),
      tipo: new FormControl('', [Validators.required]),
      detalle: new FormControl('', [Validators.required]),
      });

  async ngOnInit() {

    this.existeDatos = false;

    this.resList = await this.initializeItems();

    this.restaurante$ = this.restauranteService.recuperarDatos();
    this.afiliados$ = this.afiliadosSvc.recuperarDatos();

    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;      

    this.afiliadosSvc.listar().subscribe(a=>{
      this.listAfiliados = []
      this.listRestaurantes = [];

      a.forEach(elementA => {
        this.restauranteService.listar().subscribe(r =>{
          // this.listRestaurantes = [];
          r.forEach(elementR => {
            // this.listRestaurantes = [];
            if(this.usuarioLog == elementA.uidUsu &&  elementR.userUID == elementA.uidResta && elementA.estado === 'verdadero'){
              this.listAfiliados.push(elementA);
              this.listRestaurantes.push(elementR);
              console.log(this.listAfiliados);
              console.log(this.listRestaurantes);
              this.existeDatos = true;
              this.validarDatos(this.existeDatos)              
            }
          });
        })
      });
    })

  }

    validarDatos(valor: boolean){
    if(valor == true){
      return true
    }else if(valor == false){
      return false
    }
  }

  async initializeItems(): Promise<any> {
    const restaList = await this.db.collection('perfiles')
      .valueChanges().pipe(first()).toPromise();
      
      return restaList;
  }


  async filterList(evt) {
    this.restaurante$ = await this.initializeItems();
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

  realizarQueja(id : string ){

    let quejas = new queja();

    const valores = this.queja.value
      
    return new Promise<any>((resolve, reject) => {
  
      let quejaID = this.db.createId();
      quejas.id = quejaID;
      let usuario = this.perfilService.getUsuario(this.usuarioLog);
      usuario.subscribe(data =>{
        this.db.collection('quejas').doc(quejaID).set({
          uidUsu : this.usuarioLog,
          uidResta : id,
          id : quejas.id,
          nombre : data.nombre,
          numero : data.numero,
          estado : "pendiente",
          tipo : valores.tipo,
          motivo : valores.detalle
        }).then((res) =>{
          this.presentAlert();
          resolve(res)
        }).catch(err => reject(err))
      })
     
    })
   
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Gracias por tu Opinion',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
