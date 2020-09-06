import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service'
import { afiliado } from 'src/app/models/afiliados-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-afiliados-aceptados',
  templateUrl: './afiliados-aceptados.page.html',
  styleUrls: ['./afiliados-aceptados.page.scss'],
})
export class AfiliadosAceptadosPage implements OnInit {

  public afiliados: any =[];
  public usuarioLog:string;
  public afiliados$: Observable<afiliado[]>;

  constructor(private router:Router, private AFauth : AngularFireAuth,
    private afiliadosService : AfiliadosServiceService) { }

  ngOnInit() {

    this.afiliados$ = this.afiliadosService.recuperarDatos()

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }
    
    //this.afiliadosService.getAfiliados().subscribe( data =>{
    //  this.afiliados = data;
    //})
  }

  goRegreso(){
    this.router.navigate(['/afiliados'])
  }

}
