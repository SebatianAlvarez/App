import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva-interface';
import { ReservaPage } from '../reserva/reserva.page';
import { ReservasService } from '../../servicios/reservas.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public usuarioLog:string;
  public currentUser = this.AFauth.auth.currentUser;

  public contador: number

  constructor(private reservasService: ReservasService, private AFauth : AngularFireAuth, private router: Router) { }

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

    this.numeroReserva();
    console.log("a ver", this.contador);
    
    
  }

  numeroReserva(){
    this.contador = 0;
    let aux = 0
    this.reservasService.listar().subscribe(data =>{
      data.forEach(x => {
        if(this.usuarioLog === x.uidResta && x.estado === 'En Revision'){
          console.log("s", x);
          aux ++;
        }

      });
      this.contador = aux;
      console.log("cuantos", this.contador);
      
    })
  }


}
