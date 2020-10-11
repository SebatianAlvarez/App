import { Component, OnInit } from '@angular/core';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs2',
  templateUrl: './tabs2.page.html',
  styleUrls: ['./tabs2.page.scss'],
})
export class Tabs2Page implements OnInit {

  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;
  public contador: number

  constructor(private afiliadosService : AfiliadosServiceService, private AFauth : AngularFireAuth, private router: Router) { }

  ngOnInit() {
    try {
      if(this.currentUser != null){
        this.usuarioLog = this.currentUser.uid;
      }else{
        console.log("No hay un usuariio logueado");
        this.router.navigate(['/perfil']);

      }
      
    } catch (error) {
      console.log(error)
      this.router.navigate(['/home']);
    } 

    this.numeroAfiliado();
    console.log("sera", this.contador);
  }

  numeroAfiliado(){
    this.contador = 0;
    let aux = 0
    this.afiliadosService.listar().subscribe(data =>{
      data.forEach(x => {
        if(this.usuarioLog === x.uidResta && x.estado === 'pendiente'){
          console.log("s", x);
          aux ++;
        }

      });
      this.contador = aux;
      console.log("cuantos mismos ps", this.contador);
      
    })
  }

}
