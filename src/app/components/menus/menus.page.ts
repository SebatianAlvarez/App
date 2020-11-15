import { Component, OnInit } from '@angular/core';
import { almuerzo } from '../../models/almuerzo-interface';
import { AlmuerzoService } from '../../servicios/almuerzo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { Observable } from 'rxjs';
import { resta } from '../../models/restaurante-interface';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { ModalController } from '@ionic/angular';
import { EditarAlmuerzoComponent } from '../editar-menu/editar-almuerzo/editar-almuerzo.component'


@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {

  almuerzos: almuerzo[];
  almuerzoUser: almuerzo[] = []; 
  restaUser: resta[] = []
  restaurantes: resta[]
  public restaurante$: Observable<resta[]>;

  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;

  constructor(private almuerzoService: AlmuerzoService, private AFauth : AngularFireAuth, private router:Router,
    private restauranteService : RestaurantesService, private modal: ModalController) { }

  ngOnInit() {

    this.restaurante$ = this.restauranteService.recuperarDatos();
    this.restauranteService.listar().subscribe(res =>{
      this.restaurantes = res;
      this.almuerzoService.listar().subscribe(almu =>{
        this.almuerzos = almu
      })
    })

    this.restauranteService.listar().subscribe((res) =>{
      console.log('Todoss', res);
      this.restaUser = [];
      res.forEach(element => {
        if(element['userUID'] === this.usuarioLog){
          this.restaUser.push(element)
          console.log("aver " +  this.restaUser)
        }
      });
    })

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

  openAlmu(alm){
    this.modal.create({
      component: EditarAlmuerzoComponent,
      componentProps : {
        alm: alm,
        almuerzos: this.almuerzos
      }
    }).then((modal) => modal.present())
  }

  

}
