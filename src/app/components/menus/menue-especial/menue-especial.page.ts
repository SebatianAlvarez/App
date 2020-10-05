import { Component, OnInit } from '@angular/core';
import { MeriendaService } from '../../../servicios/merienda.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { especial } from '../../../models/especial-interface';

@Component({
  selector: 'app-menue-especial',
  templateUrl: './menue-especial.page.html',
  styleUrls: ['./menue-especial.page.scss'],
})
export class MenueEspecialPage implements OnInit {
  // almuerzos: almuerzo[];
  especialUser: especial[] = []; 


  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;

  constructor(private especialSvc: MeriendaService, private AFauth : AngularFireAuth, private router:Router) { }

  ngOnInit() {
    

    if(this.currentUser != null){
      this.usuarioLog = this.currentUser.uid;
    }else{
      console.log("No hay un usuariio logueado");
      this.router.navigate(['/listado']);
    }

  this.especialSvc.listar().subscribe((espe) =>{
    console.log('Todoss', espe);
    this.especialUser = [];
    console.log('usuario logueado', this.usuarioLog);
    espe.forEach(element => {
      if(element['userUID'] === this.usuarioLog){
        this.especialUser.push(element)
      }
    });
  })

  console.log("que es", this.especialUser);
  }

  onRemove(idEspecial :string){
    this.especialSvc.removeEspecial(idEspecial);
    
  }

}
