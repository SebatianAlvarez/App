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
import { Observable } from 'rxjs';
import { especial } from '../../models/especial-interface'



@Component({
  selector: 'app-ver-menu',
  templateUrl: './ver-menu.page.html',
  styleUrls: ['./ver-menu.page.scss'],
})
export class VerMenuPage implements OnInit {

  public desayunos : desayuno[]
  public almuerzos: almuerzo[]

  public usuarioLog : string

  public especiales$: Observable<especial[]>;

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

    this.especiales$ = this.meriendaService.recuperarDatos()

    var acc = document.getElementsByClassName("accordion");
    var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("active");
  
      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  } 


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
