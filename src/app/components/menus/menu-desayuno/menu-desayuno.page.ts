import { Component, OnInit } from '@angular/core';
import { DesayunoService } from '../../../servicios/desayuno.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { desayuno } from '../../../models/desayuno-interface';

@Component({
  selector: 'app-menu-desayuno',
  templateUrl: './menu-desayuno.page.html',
  styleUrls: ['./menu-desayuno.page.scss'],
})
export class MenuDesayunoPage implements OnInit {

  desayunos: desayuno[];
  desayunoUser: desayuno[] = []; 


  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;

  constructor(private desayunoService: DesayunoService, private AFauth : AngularFireAuth, private router:Router) { }

  ngOnInit() {
  
    if(this.currentUser != null){
      this.usuarioLog = this.currentUser.uid;
    }else{
      console.log("No hay un usuariio logueado");
      this.router.navigate(['/listado']);
    }

    this.desayunoService.listar().subscribe((alm) =>{
      console.log('Todoss', alm);
      this.desayunoUser = [];
      alm.forEach(element => {
        if(element['userUID'] === this.usuarioLog){
          this.desayunoUser.push(element)
        }
      });
    })

  }

  onRemove(idDesayuno :string){
    this.desayunoService.removerDesayuno(idDesayuno);
    
  }

}
