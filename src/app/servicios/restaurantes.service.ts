import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface resta {
  nombre : string
  tipo : string
  capacidad : string
  precio : string
  ubicacion : string
  horario : string
  id : string
  entrada: string
  segundo: string
  jugo: string
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(private db: AngularFirestore) { }

  getRestaurantes(){
    return this.db.collection("restaurantes").snapshotChanges().pipe(map(res => {
      return res.map(x => {
        const data = x.payload.doc.data() as resta;
        data.id = x.payload.doc.id;
        return data;
      })
    }))

  }
}
