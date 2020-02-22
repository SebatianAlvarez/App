import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

//crear el objeto

export interface resta {
  nombre : string
  tipo : string
  capacidad : string
  direccion : any
  horario : string
  id : string
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(private db: AngularFirestore) { }

  //consulta a la base

  getRestaurantes(){
    return this.db.collection("restaurantes").snapshotChanges().pipe(map(res => {
      return res.map(x => {
        const data = x.payload.doc.data() as resta;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }

  getDireccion(){
    return this.db.collection("restaurantes").snapshotChanges().pipe(map(res => {
      return res.map(x => {
        const data = x.payload.doc.data() as resta;
        data.id = x.payload.doc.id;
        return data.direccion;
      })
    }))
  }
}
