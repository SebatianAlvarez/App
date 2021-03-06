import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../servicios/menu.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { resta } from '../../models/restaurante-interface';

import { almuerzo } from '../../models/almuerzo-interface';
import { desayuno } from '../../models/desayuno-interface';
import { especial } from '../../models/especial-interface';

import { AlmuerzoService } from '../../servicios/almuerzo.service';
import { MeriendaService } from '../../servicios/merienda.service';

import { FormControl , Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public usuarioLog:string
  public restaurantes : resta[]

  public desayunos$ : Observable<desayuno[]>;
  public almuerzos$ : Observable<almuerzo[]>;

  public especiales$: Observable<especial[]>;

  public restaurantes$: Observable<resta[]>;

  public desa: desayuno = {

    detalleDesayuno : '',
    platoDesayuno : '',
    precioDesayuno:''
  };



  public almu: almuerzo = {
    tipoAlmuerzo: '',
    entradaAlmuerzo: '',
    segundoAlmuerzo: '',
    jugoAlmuerzo: '',
    precioAlmuerzo: '',
  }


  constructor(private menuService : MenuService, private AFauth : AngularFireAuth,
    private restauranteService : RestaurantesService, private formBuilder: FormBuilder,
     private almuerzoService : AlmuerzoService, private meriendaService: MeriendaService,
     private router:Router
    ) { }

    public errorDesayunoMensajes ={
      tipo : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'}
      ],
      detalle : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'}
      ],
      precio : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'pattern', message: 'El campo  solo contiene números'}
      ]
    };

    public desayuno = this.formBuilder.group ({
      id: new FormControl (''),
      tipo: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      detalle: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      precio: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });

    public errorAlmuerzoMensajes ={
      entrada : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'}
      ],
      segundo : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'}
      ],
      jugo : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'}
      ],
      precio : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'pattern', message: 'El campo  solo contiene números'}
      ]
    };

    public almuerzo = this.formBuilder.group ({
      id: new FormControl (''),
      entrada: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      segundo: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      jugo: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      precio: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });

    public errorMeriendaMensajes ={
      detalle : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'}
      ],
      plato : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'}
      ],
      precio : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'pattern', message: 'El campo  solo contiene números'}
      ]
    };

    public merienda = this.formBuilder.group ({
      id: new FormControl (''),
      detalle: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      plato: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      precio: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });

  ngOnInit() {

    this.desayunos$ = this.menuService.recuperarDatos()


    this.almuerzos$ = this.almuerzoService.recuperarDatos()

    this.especiales$ = this.meriendaService.recuperarDatos()

    this.restaurantes$ = this.restauranteService.recuperarDatos()

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }
    
  }

  actualizarDesayuno(id : string){

      const valores = this.desayuno.value;
      this.desa.detalleDesayuno = valores.detalle
      this.desa.platoDesayuno = valores.tipo
      this.desa.precioDesayuno = valores.precio
      this.menuService.updateDesayuno(id , this.desa).then(() =>{
      })
  }

  actualizarAlmuerzo(id : string){

    const valores = this.almuerzo.value;
    this.almu.entradaAlmuerzo = valores.entrada
    this.almu.segundoAlmuerzo = valores.segundo
    this.almu.jugoAlmuerzo = valores.jugo
    this.almu.precioAlmuerzo = valores.precio
    this.almuerzoService.updateAlmuerzo(id , this.almu).then(() =>{
      this.router.navigate(['ver-menu'])
    })
}

// actualizarMerienda(id : string){

//   const valores = this.merienda.value;
//   this.meri.detalleMerienda = valores.detalle
//   this.meri.platoMerienda = valores.plato
//   this.meri.precioMerienda = valores.precio
//   this.meriendaService.updateMerienda(id , this.meri).then(() =>{
//   })
// }

}
