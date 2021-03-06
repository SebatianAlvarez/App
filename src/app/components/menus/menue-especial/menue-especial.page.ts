import { Component, OnInit } from '@angular/core';
import { MeriendaService } from '../../../servicios/merienda.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { especial } from '../../../models/especial-interface';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EditarEspeciaComponent } from '../../editar-menu/editar-especia/editar-especia.component';
import { Observable } from 'rxjs';
import { resta } from '../../../models/restaurante-interface';
import { RestaurantesService } from '../../../servicios/restaurantes.service';

@Component({
  selector: 'app-menue-especial',
  templateUrl: './menue-especial.page.html',
  styleUrls: ['./menue-especial.page.scss'],
})
export class MenueEspecialPage implements OnInit {
  // almuerzos: almuerzo[];
  especialUser: especial[] = []; 
  restaUser: resta[] = []
  restaurantes: resta[]

   public especiales: especial[];
   public restaurante$: Observable<resta[]>;


  // miform: FormGroup;


  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;

  constructor(private especialSvc: MeriendaService, private AFauth : AngularFireAuth, private router:Router, 
    private modal: ModalController, private restauranteService : RestaurantesService) { }

  ngOnInit() {
    
    this.restaurante$ = this.restauranteService.recuperarDatos();
      // para listar en el modal
    this.especialSvc.listar().subscribe(espe => {
        this.especiales = espe;
    })

    this.restauranteService.listar().subscribe(res =>{
      this.restaurantes = res;
    })

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

  console.log("que es", this.especialUser);
  }

  onRemove(idEspecial :string){
    this.especialSvc.removeEspecial(idEspecial);
    
  }

  openEsp(res){
    this.modal.create({
      component: EditarEspeciaComponent,
      componentProps : {
        res: res,
        especiales: this.especiales,
      }
    }).then((modal) => modal.present())
  }

  
  // get getIngredientes(){
  //   return this.miform.get('ingredientes') as FormArray;
  // }

  // addIngredientes(ingrediente: string){
  //   const control = <FormArray>this.miform.controls['ingredientes'];
  //   control.push(this.fb.group({ingrediente: []}));
  // }

  // removeIngrediente(index: number){
  //   const control = <FormArray>this.miform.controls['ingredientes'];
  //   control.removeAt(index);
  // }

}
