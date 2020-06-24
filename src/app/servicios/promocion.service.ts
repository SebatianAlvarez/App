import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { promos } from '../models/promos-interface';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  private promosCollection: AngularFirestoreCollection<promos>;
  private promos: Observable<promos[]>;

  constructor(private db:AngularFirestore) { 
    this.promosCollection = this.db.collection<promos>('promociones');
    this.promos = this.promosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ... data};
        });
      }
    ));
  }
   recuperarDatos(): Observable<promos[]>{
    return this.db
      .collection('promociones')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as promos;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  getPromos() : Observable<promos[]>{
    return this.promos;
  }

  getPromo(id : string) : Observable<promos>{
    return this.promosCollection.doc<promos>(id).valueChanges().pipe(
      take(1),
      map(promo => {
        promo.id = id
        return promo;
      })
    )
  }

  updatePromo(id: string, promo : promos): Promise<void>{
    return this.promosCollection.doc(id).update(promo);
  }

  addPromo(promo: promos): Promise<DocumentReference>{
    return this.promosCollection.add(promo)
  }

  deletePromo(id:string): Promise<void>{
    return this.promosCollection.doc(id).delete();
  }

}
