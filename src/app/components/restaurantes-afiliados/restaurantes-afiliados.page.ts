import { resta } from './../../models/restaurante-interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { afiliado } from '../../models/afiliados-interface';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantes-afiliados',
  templateUrl: './restaurantes-afiliados.page.html',
  styleUrls: ['./restaurantes-afiliados.page.scss'],
})
export class RestaurantesAfiliadosPage implements OnInit {

  restaurante$: Observable<resta[]>;
  afiliados$: Observable<afiliado[]>;

  usuarioLog: string;
  constructor(private afiliadosSvc: AfiliadosServiceService, 
              private restauranteService: RestaurantesService,
              private AFauth : AngularFireAuth,
              private router : Router) { }

  ngOnInit() {
    this.restaurante$ = this.restauranteService.recuperarDatos();
    this.afiliados$ = this.afiliadosSvc.recuperarDatos();

    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;      


  }

  goMapa(){
    this.router.navigate(['/listado']);
  }

}
