import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { queja } from '../../models/quejas-interface';
import { Observable } from 'rxjs';
import { QuejasService } from '../../servicios/quejas.service';
import { resta } from '../../models/restaurante-interface';
import { RestaurantesService } from '../../servicios/restaurantes.service';

@Component({
  selector: 'app-visualizar-quejas',
  templateUrl: './visualizar-quejas.page.html',
  styleUrls: ['./visualizar-quejas.page.scss'],
})
export class VisualizarQuejasPage implements OnInit {

  public afiliados: any =[];
  public usuarioLog:string;

  public quejas$: Observable<queja[]>;
  public restaurante$: Observable<resta[]>;

  listaRestaurante: resta[]= [];
    listaQuejasP: queja[]=[];
    existeDatos: boolean;

  constructor(private router:Router, public actionSheetController: ActionSheetController,
    private authservice: AuthService, private quejasService: QuejasService,
    private AFauth : AngularFireAuth, public alertController: AlertController,
    private restauranteSvc : RestaurantesService) { }

  ngOnInit() {

    this.quejas$ = this.quejasService.recuperarDatos()
    this.restaurante$ = this.restauranteSvc.recuperarDatos()
    this.existeDatos = false;
    console.log("aver " + this.quejas$)


    this.quejasService.listar().subscribe(rp =>{
      this.listaQuejasP = [];
      this.listaRestaurante =[];
      rp.forEach(elementRP => {
        this.restauranteSvc.listar().subscribe(res =>{

          res.forEach(elementR => {
            if(this.usuarioLog === elementRP.uidResta && elementR.userUID === elementRP.uidResta && elementRP.estado === 'pendiente'){
              this.listaQuejasP.push(elementRP);
              this.listaRestaurante.push(elementR);
              console.log(this.listaRestaurante);
              console.log(this.listaQuejasP);
              this.existeDatos = true;
              this.validarDatos(this.existeDatos);
            }
          });
        })
      });
    })


    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }

    //this.afiliadosService.getAfiliados().subscribe( data =>{
    //  this.afiliados = data;
    //})
  }

  validarDatos(valor: boolean){
    if(valor == true){
      return true
    }else if(valor == false){
      return false
    }
  }

  aprobarQueja(id : string){
    this.quejasService.getAfiliado(id).subscribe(x =>{
      let que : queja = {
        estado : "verdadero",
      }
      this.quejasService.updateAfiliado(id , que);
      this.presentAlertAprobado()
    });
  }

  async presentAlertAprobado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sugerencia Atendida',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  rechazarQueja(id : string, motivo: string){
    this.quejasService.getAfiliado(id).subscribe(x =>{
      let que : queja = {
        estado : "falso",
        rechazo: motivo
      }
      this.quejasService.updateAfiliado(id , que);
    });
  }

  async presentAlertRechazado(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sugerencia Rechazada',
      inputs: [
        {
          name: "comentario",
          type: "text",
          placeholder: "Motivo del Rechazo"
        }
      ],
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons : [
        {
          text : "Cancelar",
          role : "cancel",
          cssClass : "secondary",
          handler: () =>{

          }
        },{
          text : "Confirmar Rechazo",
          handler : data =>{
            this.rechazarQueja(id, data.comentario)
          }
        }
      ]
    });

    await alert.present();
  }

}
