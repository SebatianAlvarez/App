import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { MeriendaService } from '../../../servicios/merienda.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { especial } from '../../../models/especial-interface';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-lista-especial',
  templateUrl: './lista-especial.page.html',
  styleUrls: ['./lista-especial.page.scss'],
})
export class ListaEspecialPage implements OnInit {

  public currentUser = this.AFauth.auth.currentUser;
  miform: FormGroup;

  especial: especial = {
    id:'',
    platoEspecial: '',
    precioEspecial: '',
    ingredientes : ['']
  };

  especialID= null;
  especialIng: especial[] = [];

  constructor(private route: ActivatedRoute, private nav: NavController, private especialSvc: MeriendaService, private loadingController: LoadingController
    ,private AFauth : AngularFireAuth, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    
    this.especialID = this.route.snapshot.params['id'];
    // this.especialIng = this.route.snapshot.params['platoEspecial'];
    if (this.especialID){
      this.loadEspecial();
    }

    // console.log("ingre", this.especialIng);  
    

    

    this.especial.ingredientes.map(i =>{
      console.log("sera??", i);
      
    })

    console.log("thisss", this.especial.ingredientes);

    

    this.miform = this.fb.group({
      id:[''],
      platoEspecial: [''],
      precioEspecial: [''],
      ingredientes: this.fb.array(this.especial.ingredientes.map(i => this.fb.group({
        ingrediente: this.fb.control(i)
      })))
    });

    this.iniciarForm2();

    this.IngredienteArray2();
    console.log("zzzz", this.IngredientesArray());
    console.log("ccccccccc", this.getIngredientes());

    
  }



  IngredientesArray() {
    return this.especial.ingredientes.map(i => this.fb.group({
      ingrediente: this.fb.control(i)
    }))
  }

  IngredientesArray2() {
    return this.fb.group({
      ingrediente: ""
    })
  }

  
  get ingre(){
    return (<FormArray>this.miform.get('ingredientes'));
  }

  // Asi traigo los elementos al input 
  get IngredienteArray() {
    return (<FormArray>this.miform.get('ingredientes'));
  }

  getIngredientes(){
    return this.miform.get('ingredientes') as FormArray;
  }

  IngredienteArray2() {
    console.log("sFormmmmm", <FormArray>this.miform.get('ingredientes').value);
    
    (<FormArray>this.miform.get('ingredientes'));
  }

  addIngredientes(ingrediente: string){
    const control = <FormArray>this.miform.controls['ingredientes'];
    control.push(this.fb.group({ingrediente: []}));
  }

  removeIngrediente(index: number){
    const control = <FormArray>this.miform.controls['ingredientes'];
    control.removeAt(index);
  }

  async loadEspecial(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.especialSvc.getEspecial(this.especialID).subscribe(todo => {
      loading.dismiss();
      this.especial = todo;
      console.log("ffffff", this.especial.ingredientes);
      console.log("ffffff", todo);
      
      this.miform.patchValue({
        id: this.especialID,
        platoEspecial: this.especial.platoEspecial, 
        precioEspecial: this.especial.precioEspecial,
        ingredientes: this.especial.ingredientes
      });
    });
  }

  async onSubmit(formValue: any){

    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();

    console.log("no va haber..", this.especialID);
    const espe = new especial();
    espe.platoEspecial = formValue.platoEspecial,
    espe.precioEspecial = formValue.precioEspecial,
    espe.ingredientes = formValue.ingredientes;
    this.especialSvc.subirMenu(espe, this.especialID);

    loading.dismiss();

    this.router.navigate(['tabs-menu/especial'])


  }

  // Metodo que va recibir lo que tenga en el form @input = menu

  async iniciarForm2(){
    this.miform.patchValue({
      id: this.especial.id,
      platoEspecial: this.especial.platoEspecial, 
      precioEspecial: this.especial.precioEspecial,
      ingredientes: this.especial.ingredientes      
    });
  }

  async saveEspecial() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.especialID) {
      this.especialSvc.updateEspecial(this.especial, this.especialID).then(() => {
        loading.dismiss();
        // this.nav.navigateForward('tabs-menu/menus');
      this.router.navigate(['tabs-menu/especial'])

      });
    } else {
      
      this.especialSvc.addEspecialNuevo(this.especial).then(() => {
        loading.dismiss();
        // this.nav.navigateForward('tabs-menu/menus');
        this.router.navigate(['tabs-menu/especial'])

      });
    }
  }
  async onRemoveEspecial(idEspe:string) {
    const loading = await this.loadingController.create({
      message: 'eliminando....'
    });
    await loading.present();
    this.especialSvc.removeEspecial(idEspe);
    loading.dismiss();
    this.router.navigate(['tabs-menu/especial'])
    // this.nav.navigateForward('tabs-menu/menus');
  }

}
