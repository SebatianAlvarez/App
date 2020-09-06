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

@Component({
  selector: 'app-restaurantes-afiliados',
  templateUrl: './restaurantes-afiliados.page.html',
  styleUrls: ['./restaurantes-afiliados.page.scss'],
})
export class RestaurantesAfiliadosPage implements OnInit {

  restaurante$: Observable<resta[]>;
  afiliados$: Observable<afiliado[]>;

  usuarioLog: string;
  constructor(private afiliadosSvc: AfiliadosServiceService, public actionSheetController: ActionSheetController,
              private restauranteService: RestaurantesService, private alertController : AlertController,
              private AFauth : AngularFireAuth, private db: AngularFirestore,
              private router : Router, private perfilService : PerfilesService) { }

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

}
