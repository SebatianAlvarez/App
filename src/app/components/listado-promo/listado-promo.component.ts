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

  public promocion: promos


  constructor(private navparams: NavParams, private modal:ModalController) { }

  ngOnInit() {
    this.promocion = this.navparams.get('pro');
    this.res = this.navparams.get('resta');
    //this.especial = this.navparams.get('especial')
    //this.usuario = this.navparams.get('usuario');


    console.log("aaasdsd", this.res);
    console.log("aaasdsd", this.promocion);
    console.log("aaasdsd", this.especial);
    console.log("aaasdsd", this.usuario);

  }

  // ngAfterViewInit() : void {
  // }
  goRegreso(){
    this.modal.dismiss();
  }

}
