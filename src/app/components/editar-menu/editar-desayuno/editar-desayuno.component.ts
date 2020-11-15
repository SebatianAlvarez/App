import { Component, OnInit } from '@angular/core';
import { desayuno } from '../../../models/desayuno-interface';
import { FormGroup, FormBuilder, FormArray, FormControl , Validators } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DesayunoService } from '../../../servicios/desayuno.service';

@Component({
  selector: 'app-editar-desayuno',
  templateUrl: './editar-desayuno.component.html',
  styleUrls: ['./editar-desayuno.component.scss'],
})
export class EditarDesayunoComponent implements OnInit {

  public desa: desayuno;
  public miform: FormGroup;

  constructor(private navparams: NavParams, private fb: FormBuilder,
    private modal:ModalController,
    private router: Router,
    private desayunoSvc: DesayunoService) { }

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

    this.desa = this.navparams.get('des')
    console.log("ddd", this.desa);
    

    this.miform = this.fb.group({
      id:new FormControl (''),
      platoDesayuno: new FormControl ('', [Validators.required , Validators.minLength(3)]),
      detalleDesayuno: new FormControl ('',  [Validators.required, Validators.minLength(3)]),
      precioDesayuno: new FormControl ('',  [Validators.required, Validators.pattern("^[0-9,.]*$") , Validators.minLength(3)]),
      estado: new FormControl (''),
      ingredientes: this.fb.array(this.desa.ingredientes.map(i => this.fb.group({
        ingrediente: this.fb.control(i, [Validators.required, Validators.minLength(3)])
      })))
    });

    this.iniciarForm2();
  }

  onSubmit(menu: desayuno){
      this.desayunoSvc.subirMenu(menu);
    }
  
  // Asi traigo los elementos al input
  get IngredienteArray() {
    return (<FormArray>this.miform.get('ingredientes'));
  }

  IngredienteArray2() {
    console.log("arrayForm", <FormArray>this.miform.get('ingredientes'));
  }

  addIngredientes(ingrediente: string){
    const control = <FormArray>this.miform.controls['ingredientes'];
    control.push(this.fb.group({ingrediente: []}));
  }

  removeIngrediente(index: number){
    const control = <FormArray>this.miform.controls['ingredientes'];
    control.removeAt(index);
  }

  dismiss() {
    this.modal.dismiss();
  }

  async onRemoveEspecial(idEspe:string) {
    this.desayunoSvc.removerDesayuno(idEspe);
    this.dismiss();
    this.router.navigate(['tabs-menu/desayuno'])
    // this.nav.navigateForward('tabs-menu/menus');
  }

  // Metodo que va recibir lo que tenga en el form @input = menu
  private iniciarForm2():void{
    this.miform.patchValue({
      id: this.desa.id,
      estado: this.desa.estado,
      detalleDesayuno: this.desa.detalleDesayuno, 
      platoDesayuno: this.desa.platoDesayuno, 
      precioDesayuno: this.desa.precioDesayuno,
      ingredientes: this.desa.ingredientes      
    });
  }

}
