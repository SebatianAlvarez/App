import { Component, OnInit } from '@angular/core';
import { MeriendaService } from '../../../servicios/merienda.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { especial } from '../../../models/especial-interface';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EditarEspeciaComponent } from '../../editar-menu/editar-especia/editar-especia.component';

@Component({
  selector: 'app-menue-especial',
  templateUrl: './menue-especial.page.html',
  styleUrls: ['./menue-especial.page.scss'],
})
export class MenueEspecialPage implements OnInit {
  // almuerzos: almuerzo[];
  especialUser: especial[] = []; 

   public especiales: especial[];


  // miform: FormGroup;


  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;

  constructor(private especialSvc: MeriendaService, private AFauth : AngularFireAuth, private router:Router, 
    private fb: FormBuilder,
    private modal: ModalController) { }

  ngOnInit() {

    // this.miform = this.fb.group({
    //   // platoDesayuno: ['', [Validators.required]],
    //   platoEspecial: ['', [Validators.required]],
    //   precioEspecial: ['',  [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]],
    //   ingredientes: this.fb.array([this.fb.group({ingrediente: ['']})])
    // })
    
      // para listar en el modal
    this.especialSvc.listar().subscribe(espe => {
        this.especiales = espe;
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
