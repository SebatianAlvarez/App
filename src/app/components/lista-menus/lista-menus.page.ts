import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { almuerzo } from '../../models/almuerzo-interface';
import { NavController, LoadingController } from '@ionic/angular';
import { AlmuerzoService } from '../../servicios/almuerzo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl , Validators } from '@angular/forms';



@Component({
  selector: 'app-lista-menus',
  templateUrl: './lista-menus.page.html',
  styleUrls: ['./lista-menus.page.scss'],
})
export class ListaMenusPage implements OnInit {

  public currentUser = this.AFauth.auth.currentUser;

  almuerzo: almuerzo = {
    tipoAlmuerzo: '',
    estado: '',
    entradaAlmuerzo: '',
    segundoAlmuerzo: '',
    jugoAlmuerzo: '',
    precioAlmuerzo: '',
  };

  almuerzoID= null;
  miform: FormGroup;

  constructor(private route: ActivatedRoute, private nav: NavController, private almuerzoSVC: AlmuerzoService, private loadingController: LoadingController
    ,private AFauth : AngularFireAuth, private router: Router,
    private fb: FormBuilder) { }

    public errorMensajes ={
      entradaAlmuerzo : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'},

      ],
      jugoAlmuerzo : [
        { type: 'required', message: 'Este campo no puede estar vacio' },
        { type: 'minlength', message: 'Minimo 3 caracteres'},
       
      ],
      segundoAlmuerzo : [
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

    this.miform = this.fb.group({
      id:new FormControl (''),
      entradaAlmuerzo: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      estado: new FormControl ('', ),
      jugoAlmuerzo: new FormControl ('',  [Validators.required, Validators.minLength(3)]),
      precioAlmuerzo: new FormControl ('', [Validators.required, Validators.pattern("^[0-9,.]*$") , Validators.minLength(3)]),
      segundoAlmuerzo: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      tipoAlmuerzo: new FormControl (''),
    });


    this.almuerzoID = this.route.snapshot.params['id'];
    if (this.almuerzoID){
      this.loadAlmuerzo();
    }
  }

  async loadAlmuerzo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.almuerzoSVC.getAlmuerzoCollection(this.almuerzoID).subscribe(todo => {
      loading.dismiss();;
      this.almuerzo = todo;
    });
  }

  async saveAlmuerzo() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.almuerzoID) {
      this.almuerzoSVC.updateAlmuerzos(this.almuerzo, this.almuerzoID).then(() => {
        loading.dismiss();
        // this.nav.navigateForward('tabs-menu/menus');
      this.router.navigate(['tabs-menu/almuerzo'])

      });
    } else {
      
      this.almuerzoSVC.addAlmuerzoNuevo(this.almuerzo).then(() => {
        loading.dismiss();
        // this.nav.navigateForward('tabs-menu/menus');
        this.router.navigate(['tabs-menu/almuerzo'])

      });
    }
  }

  async onRemoveAlmuerzo(idAlm:string) {
    const loading = await this.loadingController.create({
      message: 'eliminando....'
    });
    await loading.present();
    this.almuerzoSVC.removeAlmuerzo(idAlm);
    loading.dismiss();
    this.router.navigate(['tabs-menu/almuerzo'])
    // this.nav.navigateForward('tabs-menu/menus');
  }

  async onSubmit(formValue: any){

    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();

    console.log("no va haber..", this.almuerzoID);
    const valores = new almuerzo();
    valores.entradaAlmuerzo = formValue.entradaAlmuerzo,
    valores.estado = formValue.estado,
    valores.jugoAlmuerzo = formValue.jugoAlmuerzo,
    valores.precioAlmuerzo = formValue.precioAlmuerzo;
    valores.segundoAlmuerzo =formValue.segundoAlmuerzo
    valores.tipoAlmuerzo = formValue.tipoAlmuerzo
    this.almuerzoSVC.subirMenu(valores, this.almuerzoID);

    loading.dismiss();

    this.router.navigate(['tabs-menu/almuerzo'])


  }

}
