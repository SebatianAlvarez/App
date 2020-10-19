import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { afiliado } from 'src/app/models/afiliados-interface';
import { Observable } from 'rxjs';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-afiliados-rechazados',
  templateUrl: './afiliados-rechazados.page.html',
  styleUrls: ['./afiliados-rechazados.page.scss'],
})
export class AfiliadosRechazadosPage implements OnInit {

  public afiliados: any =[];
  public usuarioLog:string;
  public afiliados$: Observable<afiliado[]>;

  constructor(private router:Router, private AFauth : AngularFireAuth,public actionSheetController: ActionSheetController,
    private afiliadosService : AfiliadosServiceService,private authservice: AuthService,
    public alertController: AlertController) { }

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

  eliminarAfiliacion(id : string){
    this.afiliadosService.deleteAfiliado(id)
    this.presentAlert()
  }

  onLogout(){
    this.authservice.logout();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Afiliado Eliminado',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
