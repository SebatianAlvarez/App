import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { especial } from '../../../models/especial-interface';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, Form } from '@angular/forms';
import { MeriendaService } from '../../../servicios/merienda.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-editar-especia',
  templateUrl: './editar-especia.component.html',
  styleUrls: ['./editar-especia.component.scss'],
})
export class EditarEspeciaComponent implements OnInit {

  public especiales: especial[];
  public espe: especial;

  miform: FormGroup;



  constructor(private navparams: NavParams, private fb: FormBuilder,
              private especialSvc: MeriendaService,
              private modal:ModalController,
              private router: Router) { }

  ngOnInit() {

    this.espe = this.navparams.get('res')
    this.especiales = this.navparams.get('especiales')

    this.miform = this.fb.group({
      id: [''],
      estado: [''],
      platoEspecial: [''],
      precioEspecial: [''],
      ingredientes: this.fb.array(this.espe.ingredientes.map(i => this.fb.group({
        ingrediente: this.fb.control(i)
      })))
    })

    this.espe = this.navparams.get('res')
    this.especiales = this.navparams.get('especiales')

    console.log("aver especial" + this.especiales)
    console.log("aver especial....." + this.espe)
    this.iniciarForm2();
  }


  onSubmit(menu: especial){
    console.log("ss", menu);
      this.especialSvc.subirMenu(menu);
    }
  
  // Asi traigo los elementos al input
  get IngredienteArray() {
    return (<FormArray>this.miform.get('ingredientes'));
  }

  IngredienteArray2() {
    console.log("arrayForm", <FormArray>this.miform.get('ingredientes'));

    // (<FormArray>this.miform.get('ingredientes'));
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
    this.especialSvc.removeEspecial(idEspe);
    this.dismiss();
    this.router.navigate(['tabs-menu/especial'])
    // this.nav.navigateForward('tabs-menu/menus');
  }

  
  
  
  
  // Metodo que va recibir lo que tenga en el form @input = menu

  private iniciarForm2():void{
    this.miform.patchValue({
      id: this.espe.id,
      estado: this.espe.estado,
      platoEspecial: this.espe.platoEspecial, 
      precioEspecial: this.espe.precioEspecial,
      ingredientes: this.espe.ingredientes      
    });
  }
}
