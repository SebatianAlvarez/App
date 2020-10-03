import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { almuerzo } from '../../models/almuerzo-interface';
import { NavController, LoadingController } from '@ionic/angular';
import { AlmuerzoService } from '../../servicios/almuerzo.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-lista-menus',
  templateUrl: './lista-menus.page.html',
  styleUrls: ['./lista-menus.page.scss'],
})
export class ListaMenusPage implements OnInit {

  public currentUser = this.AFauth.auth.currentUser;

  almuerzo: almuerzo = {
    entradaAlmuerzo: '',
    segundoAlmuerzo: '',
    jugoAlmuerzo: '',
    precioAlmuerzo: '',
  };

  almuerzoID= null;

  constructor(private route: ActivatedRoute, private nav: NavController, private almuerzoSVC: AlmuerzoService, private loadingController: LoadingController
    ,private AFauth : AngularFireAuth) { }

  ngOnInit() {
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
        this.nav.navigateForward('/menus');
      });
    } else {
      
      this.almuerzoSVC.addAlmuerzoNuevo(this.almuerzo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/menus');
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
    this.nav.navigateForward('/menus');
  }

}
