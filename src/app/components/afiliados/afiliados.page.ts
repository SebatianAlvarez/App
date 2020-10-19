import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service'
import { afiliado } from '../../models/afiliados-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.page.html',
  styleUrls: ['./afiliados.page.scss'],
})
export class AfiliadosPage implements OnInit {

  public afiliados: any =[];
  public usuarioLog:string;

  public afiliados$: Observable<afiliado[]>;

  constructor(private router:Router, public actionSheetController: ActionSheetController,
    private authservice: AuthService, private afiliadosService: AfiliadosServiceService,
    private AFauth : AngularFireAuth, public alertController: AlertController) { }

  ngOnInit() {

    this.afiliados$ = this.afiliadosService.recuperarDatos()


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

  goRegreso(){
    this.router.navigate(['/perfil'])
  }

  onLogout(){
    this.authservice.logout();
  }

  aceptarAfiliado(id : string){
    this.afiliadosService.getAfiliado(id).subscribe(data =>{
      let afi : afiliado = {
        estado : "verdadero",
      }
      this.afiliadosService.updateAfiliado(id , afi);
      this.presentAlert()
    });
  }

  async presentModalRechazo(id : string){
    const alert = await this.alertController.create({
      header: '¿Rechazar afiliacion?',
      inputs: [
        {
          name: "rechazo",
          type: "text",
          placeholder: "Motivo del rechazo (opcional)"
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
          text : "Confirmar Rechazo",
          handler : data =>{  
              this.rechazarAfiliado(id, data.rechazo);     
              this.presentAlertRechazo()                   
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
  }

  rechazarAfiliado(id : string, rechazo  : string){
    this.afiliadosService.getAfiliado(id).subscribe(x =>{
      let afi : afiliado = {
        estado : "falso",
        motivo: rechazo
      }
      this.afiliadosService.updateAfiliado(id , afi);
    });
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

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Afiliacion Aceptada',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertRechazo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Afiliacion Rechazada',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
