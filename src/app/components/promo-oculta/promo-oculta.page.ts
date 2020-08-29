import { Component, OnInit } from '@angular/core';
import { PromocionService} from '../../servicios/promocion.service';
import { promos } from '../../models/promos-interface';
import { AuthService } from '../../servicios/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-promo-oculta',
  templateUrl: './promo-oculta.page.html',
  styleUrls: ['./promo-oculta.page.scss'],
})
export class PromoOcultaPage implements OnInit {

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

}
