import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuService } from '../../servicios/menu.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { platos } from '../../models/platos-interface';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public menus : any = []
  public usuarioLog:string
  public menuID : platos[]

  constructor(private authservice: AuthService, private menuService : MenuService, private AFauth : AngularFireAuth,
    public actionSheetController: ActionSheetController, private router:Router, private alertController : AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe( data => {
      this.menus = data;
      console.log("sera: " + this.menus)
      
    })

    try {
      let currentUser = this.AFauth.auth.currentUser;
      this.usuarioLog = currentUser.uid;
      
    } catch (error) {
      console.log(error)
    }
    
  }

  async presentModal(id: string){
    const alert = await this.alertController.create({
      header: 'Actualizar Menu',
      inputs: [
        {
          name: "detalleDesayuno",
          type: "text",
          placeholder: "Detalle del Desayuno"
        },{
          name: "precioDesayuno",
          type: "text",
          placeholder: "Precio del Desayuno"
        },{
          name: "entradaAlmuerzo",
          type: "text",
          placeholder: "Entrada del Almuerzo"
        },{
          name: "segundoAlmuerzo",
          type: "text",
          placeholder: "Segundo del Almuerzo"
        },{
          name: "jugoAlmuerzo",
          type: "text",
          placeholder: "Jugo del Almuerzo"
        },{
          name: "precioAlmuerzo",
          type: "text",
          placeholder: "Precio del Almuerzo"
        }
      ],
      buttons : [
        {
          text : "Cancelar",
          role : "cancel",
          cssClass : "secondary",
          handler: () =>{

          }
        },{
          text : "Actualizar",
          handler : datos =>{

            let Menu :platos= {
              detalleDesayuno : datos.detalleDesayuno,
              precioDesayuno : datos.precioDesayuno,
              entradaAlmuerzo: datos.entradaAlmuerzo,
              segundoAlmuerzo : datos.segundoAlmuerzo,
              jugoAlmuerzo : datos.jugoAlmuerzo,
              precioAlmuerzo: datos.precioAlmuerzo
            }

            this.menuService.updateMenu(id, Menu).then(() =>{
              
            })
           
          }
          
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
  }

  prueba(){
  
    this.menuService.getPlatos().subscribe(data => {
      data.forEach((plato : platos) => {
        if(this.usuarioLog == plato.userUID){
          this.menuID = [plato]
          for(let x of this.menuID){
            console.log("y ahora : " + x.id)
            
          }
        }
      })
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
          this.router.navigate(['/actualizar-perfil'])
        }
      },{
        text: 'Visualizar Peticiones',
        icon: 'eye',
        handler: () => {
          this.router.navigate(['/reserva'])
        }
      }, {
        text: 'Promociones',
        icon: 'heart',
        handler: () => {
          this.router.navigate(['/promocion'])
        }
      },{
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

}
