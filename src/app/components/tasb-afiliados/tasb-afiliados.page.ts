import { Component, OnInit } from '@angular/core';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasb-afiliados',
  templateUrl: './tasb-afiliados.page.html',
  styleUrls: ['./tasb-afiliados.page.scss'],
})
export class TasbAfiliadosPage implements OnInit {

  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;
  public contador: number

  constructor(private afiliadosService : AfiliadosServiceService, private AFauth : AngularFireAuth,
     private router: Router) { }

  ngOnInit() {
    try {
      if(this.currentUser != null){
        this.usuarioLog = this.currentUser.uid;
      }else{
        console.log("No hay un usuariio logueado");
        this.router.navigate(['/perfil']);

      }
      
    } catch (error) {
      console.log(error)
      this.router.navigate(['/home']);
    } 
  }

}
