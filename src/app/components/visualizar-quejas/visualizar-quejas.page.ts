import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { queja } from '../../models/quejas-interface';
import { Observable } from 'rxjs';
import { QuejasService } from '../../servicios/quejas.service';

@Component({
  selector: 'app-visualizar-quejas',
  templateUrl: './visualizar-quejas.page.html',
  styleUrls: ['./visualizar-quejas.page.scss'],
})
export class VisualizarQuejasPage implements OnInit {

  public afiliados: any =[];
  public usuarioLog:string;

  public quejas$: Observable<queja[]>;

  constructor(private router:Router, public actionSheetController: ActionSheetController,
    private authservice: AuthService, private quejasService: QuejasService,
    private AFauth : AngularFireAuth, public alertController: AlertController) { }

  ngOnInit() {

    this.quejas$ = this.quejasService.recuperarDatos()
    console.log("aver " + this.quejas$)


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
