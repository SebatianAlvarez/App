import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service'; 
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../models/usuario-interface';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public nombre:string;
  public email:string;
  public numero:"123456";
  public password:string;
  public rol: "cliente";

  constructor(private authSercive: AuthService, public router: Router,
    private formBuilder: FormBuilder) { }

    public errorMensajes ={
      nombre : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'}
      ],
      email : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'email', message: 'Ingrese un correo valido'}
      ],
      numero : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 10 caracteres'},
        { type: 'pattern', message: 'El campo  solo contiene números'}
      ],
      password : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 8 caracteres'}
      ]
    };

    

    public registro = this.formBuilder.group ({
      id: new FormControl (''),
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      numero: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10)]),
      nombre: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    });

  ngOnInit() {

  }

  OnSubmitRegister(user: Usuario){
    console.log("aaaa", user);
    
    this.authSercive.register(user.email, user.password, user.nombre,user.numero).then(auth =>{
      console.log(auth);
      //(this.router.navigate(['/home']))
    })
  }

}
