import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { resta } from '../../models/restaurante-interface';
import { afiliado } from '../../models/afiliados-interface';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { PerfilesService } from '../../servicios/perfiles.service';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ComentariosService } from '../../servicios/comentarios.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-restaurantes-no-afiliados',
  templateUrl: './restaurantes-no-afiliados.page.html',
  styleUrls: ['./restaurantes-no-afiliados.page.scss'],
})
export class RestaurantesNoAfiliadosPage implements OnInit {

  restaurante$: Observable<resta[]>;
  afiliados$: Observable<afiliado[]>;



  // busqueda
  public resList: any[];

  suma : number = 0
  auxi : number = 0

  // variable para validar si hay datos
  existeDatos: boolean = false;
  listAfiliados: afiliado[] = []
  listRestaurantes: resta[] = []

  usuarioLog: string;
  constructor(private afiliadosSvc: AfiliadosServiceService, public actionSheetController: ActionSheetController,
    private restauranteService: RestaurantesService, private alertController : AlertController,
    private AFauth : AngularFireAuth, private db: AngularFirestore,private formBuilder: FormBuilder,
    private router : Router, private perfilService : PerfilesService,
    private comentarioService : ComentariosService,
    public ActionSheetController: ActionSheetController, private authservice:AuthService) { }

  ngOnInit() {

    this.existeDatos = false;

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
            if(this.usuarioLog == elementA.uidUsu &&  elementR.userUID == elementA.uidResta){
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

  async presentActionSheet() {
    const actionSheet = await this.ActionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Reservas',
        icon: 'mail',
        handler: () => {
          this.router.navigate(['tabs-reservas/reserva'])
        }
      }]
    });
    await actionSheet.present();
    let result = await actionSheet.onDidDismiss();
  }

  goMapa(){
    this.router.navigate(['/listado']);
  }

}
