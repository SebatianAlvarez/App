import { Component, OnInit } from '@angular/core';

import { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.page.html',
  styleUrls: ['./formulario-reserva.page.scss'],
})
export class FormularioReservaPage implements OnInit {

  public nombre:string
  public numero:string
  public cantidad:string
  public pedido:string
  public tiempo:string

  constructor( private db: AngularFirestore) { }

  ngOnInit() {
  }

  Reservar(){
    
    return new Promise<any>((resolve, reject) => {
      this.db.collection('reservas').add({
        nombre:this.nombre,
        numero:this.numero,
        cantidad:this.cantidad,
        pedido:this.pedido,
        tiempo:this.tiempo
      }).then((res) =>{
        resolve(res)
      }).catch(err => reject(err))
    })

  }

}
