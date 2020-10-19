import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { queja } from '../../models/quejas-interface';
import { Observable } from 'rxjs';
import { QuejasService } from '../../servicios/quejas.service'

@Component({
  selector: 'app-quejas-aprobadas',
  templateUrl: './quejas-aprobadas.page.html',
  styleUrls: ['./quejas-aprobadas.page.scss'],
})
export class QuejasAprobadasPage implements OnInit {

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

  eliminarQueja(id : string){
    this.quejasService.deleteAfiliado(id);
    this.presentAlertEliminar();
  }

  async presentAlertEliminar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sugerencia Eliminada',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
