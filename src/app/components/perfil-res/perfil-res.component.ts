import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-perfil-res',
  templateUrl: './perfil-res.component.html',
  styleUrls: ['./perfil-res.component.scss'],
})
export class PerfilResComponent implements OnInit {

  public res:any

  constructor( private navparams: NavParams, private modal:ModalController, private authservice: AuthService,
    public actionSheetController: ActionSheetController, private router:Router) { }

  ngOnInit() {

    this.res = this.navparams.get('res')

  }

  goRegreso(){
    this.modal.dismiss();
  }

  goReservas(){
    this.modal.dismiss(this.router.navigate(['/formulario-reserva']))
  }

  goPeticiones(){
    this.modal.dismiss(this.router.navigate(['/reserva']))
  }

  goMenu(){
    this.modal.dismiss(this.router.navigate(['/menu']))
  }

  goMapa(){
    this.modal.dismiss(this.router.navigate(['/mapa']))
  }

  onLogout(){
    this.authservice.logout();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Editar Perfil',
        icon: 'settings',
        handler: () => {
          
        }
      }, {
        text: 'Realizar Reserva',
        icon: 'clipboard',
        handler: () => {
          this.goReservas();
        }
      }, {
        text: 'Visualizar Peticiones',
        icon: 'eye',
        handler: () => {
          this.goPeticiones();
        }
      }, {
        text: 'Actualizar Menu',
        icon: 'refresh-circle',
        handler: () => {
          this.goMenu();
        }
      }, {
        text: '¿Cómo Llegar?',
        icon: 'map',
        handler: () => {
          this.goMapa();
        }
      }, {
        text: 'Cerrar Sesion',
        icon: 'close',
        role: 'logout',
        handler: () => {
         this.onLogout();
        }
      }]
    });
    await actionSheet.present();
  }

}
