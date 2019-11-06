import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email:string;
  password:string;

  constructor(private authSercive: AuthService, public router: Router) {}

  OnSubmitLogin(){
    this.authSercive.login(this.email, this.password).then(res => {
      this.router.navigate(['/mapa']);
    }).catch(err => alert("Correo o contraseña incorrecta"))
  }

}
