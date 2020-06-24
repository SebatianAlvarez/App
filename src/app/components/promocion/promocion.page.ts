import { Component, OnInit } from '@angular/core';
import { PromocionService} from '../../servicios/promocion.service';
import { promos } from '../../models/promos-interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.page.html',
  styleUrls: ['./promocion.page.scss'],
})
export class PromocionPage implements OnInit {

  promosRef: AngularFirestoreCollection;
  newTodo: string = '';
  public uploadProgress = 0;
  public promociones : any = []
  public usuarioLog:string
  selectedFile: any;


  constructor(private promocionService : PromocionService, private storage : AngularFireStorage,
     private toastCtrl : ToastController, private authservice: AuthService, public actionSheetController: ActionSheetController,
     private router:Router, private AFauth : AngularFireAuth, private db: AngularFirestore) { 

      this.promosRef = db.collection('promociones')

     }


  ngOnInit() {
    this.promocionService.getPromos().subscribe(data =>{
      this.promociones = data
    })

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }
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
          this.router.navigate(['/actualizar-perfil'])
        }
      }, {
        text: 'Visualizar Peticiones',
        icon: 'eye',
        handler: () => {
          this.router.navigate(['/reserva']);
        }
      }, {
        text: 'Actualizar Menu',
        icon: 'refresh-circle',
        handler: () => {
          this.router.navigate(['/menu']);
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
    let result = await actionSheet.onDidDismiss();
  }

  elegirImagen(event){ 
    this.selectedFile = event.target.files

  }

  aver(){

    this.promosRef.add({
      title: this.newTodo
    })
    .then(async resp => {

      const imageUrl = await this.uploadFile(resp.id, this.selectedFile)

      this.promosRef.doc(resp.id).update({
        id: resp.id,
        fotosPromocion: imageUrl || null,
        userUID : this.usuarioLog
      })
    }).catch(error => {
      console.log(error);
    })
  }

  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
      
        const task = await this.storage.ref('imagenesPromo').child(id).put(file[0])
        return this.storage.ref(`imagenesPromo/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

}
