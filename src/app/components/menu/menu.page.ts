import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public entrada:string
  public segundo:string
  public jugo:string
  public precio:string

  constructor(private db: AngularFirestore,private authservice: AuthService,
    public actionSheetController: ActionSheetController, private router:Router) { }

  ngOnInit() {
  }

  actualizarMenu(){

    return new Promise<any>((resolve, reject) => {
      this.db.collection('menu').add({
        entrada:this.entrada,
        segundo:this.segundo,
        jugo:this.jugo,
        precio:this.precio,
      }).then((res) =>{
        resolve(res)
      }).catch(err => reject(err))
    })

  }

  goRegreso(){
    this.router.navigate(['/perfil'])
  }

  onLogout(){
    this.authservice.logout();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Mi Perfil',
        icon: 'person',
        handler: () => {
          this.router.navigate(['/perfil'])
        }
      }, {
        text: 'Editar Perfil',
        icon: 'settings',
        handler: () => {
          this.router.navigate(['/perfil'])
        }
      }, {
        text: 'Cerrar Sesion',
        icon: 'log-out',
        handler: () => {
         this.onLogout();
        }
      }]
    });
    await actionSheet.present();
  }

}
