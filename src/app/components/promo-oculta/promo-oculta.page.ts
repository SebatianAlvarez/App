import { Component, OnInit } from '@angular/core';
import { PromocionService} from '../../servicios/promocion.service';
import { promos } from '../../models/promos-interface';
import { AuthService } from '../../servicios/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-promo-oculta',
  templateUrl: './promo-oculta.page.html',
  styleUrls: ['./promo-oculta.page.scss'],
})
export class PromoOcultaPage implements OnInit {

  // public promociones : promos[]
  promociones$: Observable<promos[]>;
  promoDesHabilitados: promos[] = []; 


  public usuarioLog:string

  constructor(private promocionService : PromocionService, private authservice: AuthService,
    public actionSheetController: ActionSheetController, private router:Router, private AFauth : AngularFireAuth, public alertController: AlertController) { }

  ngOnInit() {

  //   this.promocionService.getPromos().subscribe(data =>{
  //     this.promociones = data
  //  })

  this.promociones$ = this.promocionService.recuperarDatos();


   try {
     let currentUser = this.AFauth.auth.currentUser;
     this.usuarioLog = currentUser.uid;
   } catch (error) {
     console.log(error)
   }

   this.promocionService.listar().subscribe(x =>{
    this.promoDesHabilitados = []
    x.forEach(element => {
      if( this.usuarioLog === element['userUID'] && element['estado'] === 'falso'){
        console.log("xxx", element);
        this.promoDesHabilitados.push(element)
      }else{
        console.log("no", element);
      }
    });
    console.log("array", this.promoDesHabilitados);
  })

  }

  activar(id : string){
    this.promocionService.getPromo(id).subscribe(data =>{
     let promo : promos = {
       estado: "verdadero"
     }
       this.promocionService.updatePromo(id, promo)
    })
  }

  eliminar(id : string){
    this.promocionService.deletePromo(id)
  }

  async AlertEliminar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Promoción eliminada',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async AlertHabilitar(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Promoción habilitada',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });
    await alert.present();
    this.activar(id)
  }

  async AlertConfirmEliminar(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desea eliminar la promoción?',
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
            this.eliminar(id);
            this.AlertEliminar();
          }
        }
      ]
    });

    await alert.present();
  }

}
