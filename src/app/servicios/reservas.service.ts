import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface reser {
  nombre : string
  cedula: string
  pedido: string
  cantidad:number
  id:string
}

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private db: AngularFirestore) { }

  getReservas(){
    return this.db.collection("reservas").snapshotChanges().pipe(map(res => {
      return res.map(x => {
        const data = x.payload.doc.data() as reser;
        data.id = x.payload.doc.id;
        return data;
      })
    }))

  }

}
