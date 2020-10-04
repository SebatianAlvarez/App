import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs-reservas',
  templateUrl: './tabs-reservas.page.html',
  styleUrls: ['./tabs-reservas.page.scss'],
})
export class TabsReservasPage implements OnInit {

  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;

  constructor(private AFauth : AngularFireAuth, private router: Router) { }

  ngOnInit() {
    try {
      if(this.currentUser != null){
        this.usuarioLog = this.currentUser.uid;
      }else{
        console.log("No hay un usuariio logueado");
        this.router.navigate(['/listado']);

      }
      
    } catch (error) {
      console.log(error)
      this.router.navigate(['/home']);
    } 
  }

}
