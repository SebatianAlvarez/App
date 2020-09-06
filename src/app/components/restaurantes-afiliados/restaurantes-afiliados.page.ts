import { resta } from './../../models/restaurante-interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { afiliado } from '../../models/afiliados-interface';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Reserva } from '../../models/reserva-interface';
import { AngularFirestore} from '@angular/fire/firestore';
import { PerfilesService } from '../../servicios/perfiles.service';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { CalificarService } from '../../servicios/calificar.service'
import { pregunta } from '../../models/preguntas';

import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-restaurantes-afiliados',
  templateUrl: './restaurantes-afiliados.page.html',
  styleUrls: ['./restaurantes-afiliados.page.scss'],
})
export class RestaurantesAfiliadosPage implements OnInit {

  restaurante$: Observable<resta[]>;
  afiliados$: Observable<afiliado[]>;

  suma : number = 0
  auxi : number = 0

  usuarioLog: string;
  constructor(private afiliadosSvc: AfiliadosServiceService, public actionSheetController: ActionSheetController,
              private restauranteService: RestaurantesService, private alertController : AlertController,
              private AFauth : AngularFireAuth, private db: AngularFirestore,private formBuilder: FormBuilder,
              private router : Router, private perfilService : PerfilesService,
              private  calificarService : CalificarService,
              public ActionSheetController: ActionSheetController, private authservice:AuthService,) { 

              }

              public calificar = this.formBuilder.group ({

                id: new FormControl (''),
                estrellas: new FormControl ('', [Validators.required]),
               
              });

  ngOnInit() {
    this.restaurante$ = this.restauranteService.recuperarDatos();
    this.afiliados$ = this.afiliadosSvc.recuperarDatos();

    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;      


  }

  goMapa(){
    this.router.navigate(['/listado']);
  }

  async presentModal(id : string){
    const alert = await this.alertController.create({
      header: 'Realizar Reserva',
      inputs: [
        {
          name: "mesas",
          type: "number",
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
            this.Reservar(data.mesas, data.tiempo ,id);
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
  }

  Reservar(mesa : string, tiempo: string , id : string ){

    let reserva = new Reserva();
      
    return new Promise<any>((resolve, reject) => {
  
      let reservaID = this.db.createId();
      reserva.uid = reservaID;
      let usuario = this.perfilService.getUsuario(this.usuarioLog);
      usuario.subscribe(data =>{
        this.db.collection('reservas').doc(reservaID).set({
          uidUsu : this.usuarioLog,
          uidResta : id,
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

  onLogout(){
    this.authservice.logout();
  }

  Calificacion(id : string){

    const valores: number = this.calificar.value
    let x = valores['estrellas']

    this.restauranteService.getRestaurante(id).subscribe( data => {

       let a : number = (parseInt(x) + data.calificacion)
       let y : number = data.aux + 1
       let total = (a/y)

       let califica : resta = {
        aux:y,
        calificacion: a,
        promedio : total
      }

      this.restauranteService.updateRestaurante(id, califica)


      
    })
    
  }

}
