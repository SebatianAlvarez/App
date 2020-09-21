import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service'

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.page.html',
  styleUrls: ['./verificar-email.page.scss'],
})
export class VerificarEmailPage implements OnInit {

  constructor(private authservice : AuthService) { }

  ngOnInit() {
  }

  verificarEmail(){
    this.authservice.enviarEmailVerificacion()
  }

}
