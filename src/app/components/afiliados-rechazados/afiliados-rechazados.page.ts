import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { afiliado } from 'src/app/models/afiliados-interface';
import { Observable } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
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
    private afiliadosService : AfiliadosServiceService,private authservice: AuthService) { }

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

  onLogout(){
    this.authservice.logout();
  }

}