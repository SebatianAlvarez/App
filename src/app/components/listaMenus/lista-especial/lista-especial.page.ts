import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { MeriendaService } from '../../../servicios/merienda.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { especial } from '../../../models/especial-interface';

@Component({
  selector: 'app-lista-especial',
  templateUrl: './lista-especial.page.html',
  styleUrls: ['./lista-especial.page.scss'],
})
export class ListaEspecialPage implements OnInit {

  public currentUser = this.AFauth.auth.currentUser;

  especial: especial = {
    platoEspecial: '',
    precioEspecial: ''
  };

  especialID= null;

  constructor(private route: ActivatedRoute, private nav: NavController, private especialSvc: MeriendaService, private loadingController: LoadingController
    ,private AFauth : AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.especialID = this.route.snapshot.params['id'];
    if (this.especialID){
      this.loadEspecial();
    }
  }

  async loadEspecial(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.especialSvc.getEspecial(this.especialID).subscribe(todo => {
      loading.dismiss();;
      this.especial = todo;
    });
  }

  async saveEspecial() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.especialID) {
      this.especialSvc.updateEspecial(this.especial, this.especialID).then(() => {
        loading.dismiss();
        // this.nav.navigateForward('tabs-menu/menus');
      this.router.navigate(['tabs-menu/especial'])

      });
    } else {
      
      this.especialSvc.addEspecialNuevo(this.especial).then(() => {
        loading.dismiss();
        // this.nav.navigateForward('tabs-menu/menus');
        this.router.navigate(['tabs-menu/especial'])

      });
    }
  }
  async onRemoveEspecial(idEspe:string) {
    const loading = await this.loadingController.create({
      message: 'eliminando....'
    });
    await loading.present();
    this.especialSvc.removeEspecial(idEspe);
    loading.dismiss();
    this.router.navigate(['tabs-menu/especial'])
    // this.nav.navigateForward('tabs-menu/menus');
  }

}
