import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service'
import { afiliado } from 'src/app/models/afiliados-interface';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.page.html',
  styleUrls: ['./afiliados.page.scss'],
})
export class AfiliadosPage implements OnInit {

  public afiliados: any =[];
  public usuarioLog:string;

  constructor(private router:Router, public actionSheetController: ActionSheetController,
    private authservice: AuthService, private afiliadosService: AfiliadosServiceService,
    private AFauth : AngularFireAuth) { }

  ngOnInit() {
    this.afiliadosService.getAfiliados().subscribe( data =>{
      this.afiliados = data;

      try {
        let currentUser = this.AFauth.auth.currentUser;
        this.usuarioLog = currentUser.uid;
        
      } catch (error) {
        console.log(error)
      }
      
    })
  }

  goRegreso(){
    this.router.navigate(['/perfil'])
  }

  onLogout(){
    this.authservice.logout();
  }

  aceptarAfiliado(id : string){
    this.afiliadosService.getAfiliado(id).subscribe(data =>{
      let afi : afiliado = {
        nombre : data.nombre,
        numero : data.numero,
        id : data.id,
        uidResta : data.uidResta,
        uidUsu : data.uidUsu,
        estado : "verdadero",
        idRes : data.idRes
      }
      this.afiliadosService.updateAfiliado(id , afi);
    });
  }

  rechazarAfiliado(id : string){
    this.afiliadosService.getAfiliado(id).subscribe(data =>{
      let afi : afiliado = {
        nombre : data.nombre,
        numero : data.numero,
        id : data.id,
        uidResta : data.uidResta,
        uidUsu : data.uidUsu,
        estado : "falso",
        idRes : data.idRes
      }
      this.afiliadosService.updateAfiliado(id , afi);
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Afiliados Activos',
        icon: 'star',
        handler: () => {
          this.router.navigate(['/afiliados-aceptados'])
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
