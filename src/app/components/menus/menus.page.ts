import { Component, OnInit } from '@angular/core';
import { almuerzo } from '../../models/almuerzo-interface';
import { AlmuerzoService } from '../../servicios/almuerzo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {

  almuerzos: almuerzo[];
  almuerzoUser: almuerzo[] = []; 


  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;

  constructor(private almuerzoService: AlmuerzoService, private AFauth : AngularFireAuth, private router:Router) { }

  ngOnInit() {



      if(this.currentUser != null){
        this.usuarioLog = this.currentUser.uid;
      }else{
        console.log("No hay un usuariio logueado");
        this.router.navigate(['/listado']);
      }

    this.almuerzoService.listar().subscribe((alm) =>{
      console.log('Todoss', alm);
      this.almuerzoUser = [];
      console.log('usuario logueado', this.usuarioLog);
      alm.forEach(element => {
        if(element['userUID'] === this.usuarioLog){
          this.almuerzoUser.push(element)
        }
      });
    })

    console.log("que es", this.almuerzoUser);
    
  }

  onRemove(idAlmuerzo :string){
    this.almuerzoService.removeAlmuerzo(idAlmuerzo);
    
  }

  

}
