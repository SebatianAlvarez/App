import { Component, OnInit } from '@angular/core';
import { PromocionService} from '../../servicios/promocion.service';
import { promos } from '../../models/promos-interface';
import { AuthService } from '../../servicios/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-promo-activa',
  templateUrl: './promo-activa.page.html',
  styleUrls: ['./promo-activa.page.scss'],
})
export class PromoActivaPage implements OnInit {

 
  public promociones : promos[]
  public usuarioLog:string

  constructor(private promocionService : PromocionService, private authservice: AuthService,
     public actionSheetController: ActionSheetController, private router:Router, private AFauth : AngularFireAuth) { }

  ngOnInit() {

    this.promocionService.getPromos().subscribe(data =>{
       this.promociones = data
    })
    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
    } catch (error) {
      console.log(error)
    }
 }

 ocultar(id : string){
   this.promocionService.getPromo(id).subscribe(data =>{
    let promo : promos = {
      estado: "falso"
    }
      this.promocionService.updatePromo(id, promo)
   })
 }

}
