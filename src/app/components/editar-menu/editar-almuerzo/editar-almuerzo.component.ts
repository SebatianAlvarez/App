import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl , Validators } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { almuerzo } from '../../../models/almuerzo-interface';
import { AlmuerzoService } from '../../../servicios/almuerzo.service';

@Component({
  selector: 'app-editar-almuerzo',
  templateUrl: './editar-almuerzo.component.html',
  styleUrls: ['./editar-almuerzo.component.scss'],
})
export class EditarAlmuerzoComponent implements OnInit {

  public almu: almuerzo;
  public miform: FormGroup;

  constructor(private navparams: NavParams, private fb: FormBuilder,
    private modal:ModalController,
    private router: Router,
    private almuerzoSvc: AlmuerzoService) { }

    public errorMensajes ={
      entradaAlmuerzo : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'},

      ],
      segundoAlmuerzo : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'},
       
      ],
      jugoAlmuerzo : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'},
       
      ],
      precioAlmuerzo : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'pattern', message: 'El campo debe contener solo números'},
        { type: 'minlength', message: 'Formato minimo $,$'},
      ],
    };

  ngOnInit() {

    this.almu = this.navparams.get('alm')
    console.log("aqui", this.almu);

    this.miform = this.fb.group({
      id:new FormControl (''),
      entradaAlmuerzo: new FormControl ('', [Validators.required , Validators.minLength(3)]),
      segundoAlmuerzo: new FormControl ('', [Validators.required , Validators.minLength(3)]),
      tipoAlmuerzo: new FormControl (''),
      jugoAlmuerzo: new FormControl ('',  [Validators.required, Validators.minLength(3)]),
      precioAlmuerzo: new FormControl ('',  [Validators.required, Validators.pattern("^[0-9,.]*$") , Validators.minLength(3)]),
      estado: new FormControl (''),
    });

    this.iniciarForm2();

  }

  onSubmit(menu: almuerzo){
    this.almuerzoSvc.subirMenu(menu);
  }

  dismiss() {
    this.modal.dismiss();
  }

  async onRemoveAlmuerzo(idAlm:string) {
    this.almuerzoSvc.removeAlmuerzo(idAlm);
    this.dismiss();
    this.router.navigate(['tabs-menu/almuerzo'])
    // this.nav.navigateForward('tabs-menu/menus');
  }

  iniciarForm2():void{
    this.miform.patchValue({
      id: this.almu.id,
      estado: this.almu.estado,
      tipoAlmuerzo: this.almu.tipoAlmuerzo,
      entradaAlmuerzo: this.almu.entradaAlmuerzo,
      segundoAlmuerzo: this.almu.segundoAlmuerzo,
      jugoAlmuerzo: this.almu.jugoAlmuerzo,
      precioAlmuerzo: this.almu.precioAlmuerzo
    });
  }

}
