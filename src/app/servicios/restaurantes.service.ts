import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { promos } from '../models/promos-interface';
import { platos } from '../models/platos-interface';
import { resta } from '../models/restaurante-interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  private restaurantesCollection : AngularFirestoreCollection<resta>;
  private restaurantes : Observable<resta[]>;

  constructor(private db: AngularFirestore) {
    this.restaurantesCollection = this.db.collection<resta>('perfiles');
    this.restaurantes = this.restaurantesCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ... data};
        })
      }
    ))
   }

   getRestaurantes() : Observable<resta[]>{
    return this.restaurantes;
  }

  getRestaurante(id : string) : Observable<resta>{
    return this.restaurantesCollection.doc<resta>(id).valueChanges().pipe(
      take(1),
      map(resta => {
        resta.id = id
        return resta;
      })
    )
  }

  //consulta a la base

  

  getResta(){
    return this.db.collection('perfiles').snapshotChanges().pipe(map(res => {
      return res.map(x => {
        const data = x.payload.doc.data() as resta;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }

  getPromos(){
    return this.db.collection("promociones").snapshotChanges().pipe(map(pro => {
      return pro.map(x => {
        const data = x.payload.doc.data() as promos;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }

  getPlatos(){
    return this.db.collection("plato").snapshotChanges().pipe(map(plato => {
      return plato.map(x => {
        const data = x.payload.doc.data() as platos;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }

}
