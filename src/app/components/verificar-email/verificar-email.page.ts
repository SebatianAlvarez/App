import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.page.html',
  styleUrls: ['./verificar-email.page.scss'],
})
export class VerificarEmailPage implements OnInit {

  constructor(private authservice : AuthService, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  verificarEmail(){
    console.log("aaa");
    
    this.authservice.enviarEmailVerificacion()
  }

  onLogout(){
    this.authservice.logout();
  }

  goRegreso(){
    this.onLogout();
    this.router.navigate(['/home'])
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Correo enviado',
      // subHeader: 'Subtitle',
      message: 'Revisa tu bandeja de entrada',
      buttons: ['OK']
    });
    this.verificarEmail()
    // this.onLogout()
    await alert.present();
    this.router.navigate(['/home'])

  }

}
