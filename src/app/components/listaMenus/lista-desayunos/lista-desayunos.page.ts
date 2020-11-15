import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { DesayunoService } from '../../../servicios/desayuno.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { desayuno } from '../../../models/desayuno-interface';
import { FormGroup, FormBuilder, FormArray, FormControl , Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-desayunos',
  templateUrl: './lista-desayunos.page.html',
  styleUrls: ['./lista-desayunos.page.scss'],
})
export class ListaDesayunosPage implements OnInit {

  public currentUser = this.AFauth.auth.currentUser;

  desayuno: desayuno = {
    detalleDesayuno: '',
    platoDesayuno: '',
    precioDesayuno: '',
    estado: '',
    ingredientes: ['']
  };

  desayunoID= null;
  miform: FormGroup;


  constructor(private route: ActivatedRoute, 
              private nav: NavController,
              private desayunoSVC: DesayunoService,
              private loadingController: LoadingController,
              private AFauth : AngularFireAuth,
              private router: Router,
              private fb: FormBuilder) { }

              public errorMensajes ={
                platoDesayuno : [
                  { type: 'required', message: 'Este campo no puede estar vacio' },
                  { type: 'minlength', message: 'Minimo 3 caracteres'},
        
                ],
                detalleDesayuno : [
                  { type: 'required', message: 'Este campo no puede estar vacio' },
                  { type: 'minlength', message: 'Minimo 3 caracteres'},
                 
                ],
                precioDesayuno : [
                  { type: 'required', message: 'Este campo no puede estar vacio' },
                  { type: 'pattern', message: 'El campo debe contener solo números'},
                  { type: 'minlength', message: 'Formato minimo $,$'},
                ],
              };

  ngOnInit() {

    this.miform = this.fb.group({
      id:new FormControl (''),
      platoDesayuno: new FormControl ('', [Validators.required , Validators.minLength(3)]),
      detalleDesayuno: new FormControl ('',  [Validators.required, Validators.minLength(3)]),
      precioDesayuno: new FormControl ('',  [Validators.required, Validators.pattern("^[0-9,.]*$") , Validators.minLength(3)]),
      estado: new FormControl (''),
      ingredientes: this.fb.array(this.desayuno.ingredientes.map(i => this.fb.group({
        ingrediente: this.fb.control(i, [Validators.required, Validators.minLength(3)])
      })))
    });

    this.desayunoID = this.route.snapshot.params['id'];
    if (this.desayunoID){
      this.loadDesayuno();
    }

    

  }

  async loadDesayuno(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.desayunoSVC.getDesayunoCollection(this.desayunoID).subscribe(todo => {
      loading.dismiss();;
      this.desayuno = todo;
    });
  }

  IngredientesArray() {
    return this.desayuno.ingredientes.map(i => this.fb.group({
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

  async saveDesayuno() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.desayunoID) {
      this.desayunoSVC.updateDesayuno(this.desayuno, this.desayunoID).then(() => {
        loading.dismiss();
        // this.nav.navigateForward('tabs-menu/menus');
      this.router.navigate(['tabs-menu/desayuno'])

      });
    } else {
      
      this.desayunoSVC.addDesayunoNuevo(this.desayuno).then(() => {
        loading.dismiss();
        // this.nav.navigateForward('tabs-menu/menus');
        this.router.navigate(['tabs-menu/desayuno'])

      });
    }
  }

  async onSubmit(formValue: any){

    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();

    console.log("no va haber..", this.desayunoID);
    const espe = new desayuno();
    espe.platoDesayuno = formValue.platoDesayuno,
    espe.detalleDesayuno = formValue.detalleDesayuno,
    espe.estado = formValue.estado,
    espe.precioDesayuno = formValue.precioDesayuno,
    espe.ingredientes = formValue.ingredientes;
    this.desayunoSVC.subirMenu(espe, this.desayunoID);

    loading.dismiss();

    this.router.navigate(['tabs-menu/desayuno'])


  }

  async onRemoveDesayuno(idDes:string) {
    const loading = await this.loadingController.create({
      message: 'eliminando....'
    });
    await loading.present();
    this.desayunoSVC.removerDesayuno(idDes);
    loading.dismiss();
    this.router.navigate(['tabs-menu/desayuno'])
    // this.nav.navigateForward('tabs-menu/menus');
  }
}
