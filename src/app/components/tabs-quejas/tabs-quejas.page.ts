import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs-quejas',
  templateUrl: './tabs-quejas.page.html',
  styleUrls: ['./tabs-quejas.page.scss'],
})
export class TabsQuejasPage implements OnInit {

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
