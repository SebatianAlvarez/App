import { Component, OnInit } from '@angular/core';
import { almuerzo } from '../../models/almuerzo-interface';
import { desayuno } from '../../models/desayuno-interface';

import { AlmuerzoService } from '../../servicios/almuerzo.service';
import { MeriendaService } from '../../servicios/merienda.service';
import { MenuService } from '../../servicios/menu.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { ActionSheetController } from '@ionic/angular';



@Component({
  selector: 'app-ver-menu',
  templateUrl: './ver-menu.page.html',
  styleUrls: ['./ver-menu.page.scss'],
})
export class VerMenuPage implements OnInit {

  public desayunos : desayuno[]
  public almuerzos: almuerzo[]

  public usuarioLog : string

  constructor(private desayunoService : MenuService, private AFauth : AngularFireAuth,
    private almuerzoService : AlmuerzoService, private meriendaService : MeriendaService,
    private router:Router, private authservice: AuthService, public actionSheetController: ActionSheetController) { }

  ngOnInit() {

    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;

    this.desayunoService.getDesas().subscribe(desa => {
      this.desayunos = desa;
    })
    
    this.almuerzoService.getAlmu().subscribe(almu =>{
      this.almuerzos = almu;
    })


  }

  goRegreso(){
    this.router.navigate(['/perfil'])
  }

  onLogout(){
    this.authservice.logout();
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

}
