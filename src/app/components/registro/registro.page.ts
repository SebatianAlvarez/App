import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public email:string;
  public password:string;
  public nombre:string;
  public numero:string;

  constructor(private authSercive: AuthService, public router: Router) { }

  ngOnInit() {
  }

  /*
  OnSubmitRegister(){
    this.authSercive.register(this.email , this.password).then(auth =>{
      (this.router.navigate(['/home']))
    })
  }
  */

  
  OnSubmitRegister(){
    this.authSercive.register(this.email , this.password, this.nombre, this.numero).then(auth =>{
      (this.router.navigate(['/home']))
    })
  }

}
