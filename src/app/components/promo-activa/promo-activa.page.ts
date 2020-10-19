import { Component, OnInit } from '@angular/core';
import { PromocionService} from '../../servicios/promocion.service';
import { promos } from '../../models/promos-interface';
import { AuthService } from '../../servicios/auth.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-promo-activa',
  templateUrl: './promo-activa.page.html',
  styleUrls: ['./promo-activa.page.scss'],
})
export class PromoActivaPage implements OnInit {

 
  // public promociones : promos[]
  promociones$: Observable<promos[]>;
  promoHabilitados: promos[] = []; 


  public usuarioLog:string

  constructor(private promocionService : PromocionService, private authservice: AuthService,
     public actionSheetController: ActionSheetController, private router:Router, private AFauth : AngularFireAuth, public alertController: AlertController) { }

  ngOnInit() {


    this.promociones$ = this.promocionService.recuperarDatos();

    // this.promocionService.getPromos().subscribe(data =>{
    //    this.promociones = data
    // })

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
    } catch (error) {
      console.log(error)
    }

    this.promocionService.listar().subscribe(x =>{
      this.promoHabilitados = []
      x.forEach(element => {
        if( this.usuarioLog === element['userUID'] && element['estado'] === 'verdadero'){
          this.promoHabilitados.push(element)
        }else{
          console.log("no");
        }
      });
    })
 }



 ocultar(id : string){
   //console.log("que es esto", promocionId);
   

  //this.promocionService.deshabilitarPromo(promocionId);
  //console.log("Promocion Deshabilitada");
  
    this.promocionService.getPromo(id).subscribe(data =>{
     let promo : promos = {
       estado: "falso"
     }
       this.promocionService.updatePromo(id, promo)
    })
 }

 async AlertDeshabilitar() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Promoción deshabilitada',
    // subHeader: 'Subtitle',
    // message: 'This is an alert message.',
    buttons: ['OK']
  });

  await alert.present();
}


 async AlertConfirmDeshabilitar(id: string) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: '¿Desea deshabilitar la promoción?',
    // message: 'Message <strong>text</strong>!!!',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Si',
        handler: () => {
          console.log('Confirm Okay');
          this.ocultar(id);
          this.AlertDeshabilitar();
        }
      }
    ]
  });

  await alert.present();
}

}
