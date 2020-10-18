import { Component, OnInit, AfterViewInit } from '@angular/core';
import { resta } from '../../models/restaurante-interface';
import { promos } from '../../models/promos-interface';
import { NavParams, ModalController } from '@ionic/angular';
import { especial } from '../../models/especial-interface';
import { Usuario } from '../../models/usuario-interface';

@Component({
  selector: 'app-listado-promo',
  templateUrl: './listado-promo.component.html',
  styleUrls: ['./listado-promo.component.scss'],
})
export class ListadoPromoComponent implements OnInit  {

  public res : resta[];
  public especial : especial[];
  public usuario : Usuario[];

  public promocion: promos;

  // variable para cargar el restaurante seleccionado
  listRestaurante: resta[] = [];


  constructor(private navparams: NavParams, private modal:ModalController) { }

  ngOnInit() {

    this.promocion = this.navparams.get('pro');
    this.res = this.navparams.get('resta');
    //this.especial = this.navparams.get('especial')
    //this.usuario = this.navparams.get('usuario');


    console.log("restaurante??", this.res);
    console.log("aaasdsd", this.promocion);
    console.log("especial", this.especial);
    console.log("aaasdsd", this.usuario);


    this.res.forEach(elementR => {
      this.listRestaurante = [];
        if(this.promocion.userUID === elementR.userUID){
          this.listRestaurante.push(elementR);
          console.log(this.listRestaurante);    
      }      
    });
    console.log(this.listRestaurante);    

  }

  // ngAfterViewInit() : void {
  // }
  goRegreso(){
    this.modal.dismiss();
  }


}
