import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { afiliado } from '../../models/afiliados-interface';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Reserva } from '../../models/reserva-interface';
import { AngularFirestore} from '@angular/fire/firestore';
import { PerfilesService } from '../../servicios/perfiles.service';
import { resta } from './../../models/restaurante-interface';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { CalificarService } from '../../servicios/calificar.service';
import { AuthService } from '../../servicios/auth.service';

import { first } from 'rxjs/operators';


import { ComentariosService } from '../../servicios/comentarios.service';
import { comentarios } from '../../models/comentarios-interface';

@Component({
  selector: 'app-restaurantes-afiliados-pendientes',
  templateUrl: './restaurantes-afiliados-pendientes.page.html',
  styleUrls: ['./restaurantes-afiliados-pendientes.page.scss'],
})
export class RestaurantesAfiliadosPendientesPage implements OnInit {

  restaurante$: Observable<resta[]>;
  afiliados$: Observable<afiliado[]>;

  // busqueda
  public resList: any[];

  suma : number = 0
  auxi : number = 0

  usuarioLog: string;
  constructor(private afiliadosSvc: AfiliadosServiceService, public actionSheetController: ActionSheetController,
              private restauranteService: RestaurantesService, private alertController : AlertController,
              private AFauth : AngularFireAuth, private db: AngularFirestore,private formBuilder: FormBuilder,
              private router : Router, private perfilService : PerfilesService,
              private comentarioService : ComentariosService,
              public ActionSheetController: ActionSheetController, private authservice:AuthService,) { 

              }

  async ngOnInit() {

    this.resList = await this.initializeItems();

    this.restaurante$ = this.restauranteService.recuperarDatos();
    this.afiliados$ = this.afiliadosSvc.recuperarDatos();

    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;      


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



  goMapa(){
    this.router.navigate(['/listado']);
  }

  async presentActionSheet() {
    const actionSheet = await this.ActionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Reservas',
        icon: 'mail',
        handler: () => {
          this.router.navigate(['tabs-reservas/reserva'])
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

}
