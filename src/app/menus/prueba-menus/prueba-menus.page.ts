import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { especial } from '../../models/especial-interface';

@Component({
  selector: 'app-prueba-menus',
  templateUrl: './prueba-menus.page.html',
  styleUrls: ['./prueba-menus.page.scss'],
})
export class PruebaMenusPage implements OnInit {

  miform: FormGroup;

  constructor( private fb: FormBuilder) { 
    this.miform = this.fb.group({
      // platoDesayuno: ['', [Validators.required]],
      platoEspecial: ['', [Validators.required]],
      precioEspecial: ['',  [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]],
      // ingredientes: this.fb.array([this.fb.group({ingrediente: ['']})])
    })
  }

  ngOnInit() {
    
  }

  logForm(){
    console.log(this.miform.value)
  }

  addMenu() {
    // this.especial.subirMenu(menuMerienda);
    // this.router.navigate(['dueño/miMenu']);
    console.log("dd");
    
  }

  get getIngredientes(){
    return this.miform.get('ingredientes') as FormArray;
  }

  addIngredientes(ingrediente: string){
    const control = <FormArray>this.miform.controls['ingredientes'];
    control.push(this.fb.group({ingrediente: []}));
  }

  removeIngrediente(index: number){
    const control = <FormArray>this.miform.controls['ingredientes'];
    control.removeAt(index);
  }

}
