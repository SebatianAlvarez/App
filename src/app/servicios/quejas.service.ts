import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

import { queja } from '../models/quejas-interface';

@Injectable({
  providedIn: 'root'
})
export class QuejasService {

  private quejaCollection: AngularFirestoreCollection<queja>;
  private quejas: Observable<queja[]>;

  constructor(private db:AngularFirestore) { 
    this.quejaCollection = this.db.collection<queja>('quejas'); 

    //this.afiliados = this.afiliadoCollection.snapshotChanges().pipe(map(
    //  actions => {
    //    return actions.map( x => {
    //      const data = x.payload.doc.data();
    //      const id = x.payload.doc.id;
    //      return {id, ... data};
    //    });
    //  }
    //));
  }

  listar() {
    return this.db.collection<queja>('quejas').valueChanges();
  }

  recuperarDatos(): Observable<queja[]>{
    return this.db
      .collection('quejas')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as queja;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  getAfiliados() : Observable<queja[]>{
    return this.quejas;
  }

  getAfiliado(id : string) : Observable<queja>{
    return this.quejaCollection.doc<queja>(id).valueChanges().pipe(
      take(1),
      map(x => {
        x.id = id
        return x;
      })
    )
  }

  updateAfiliado(id: string, x : queja): Promise<void>{
    return this.quejaCollection.doc(id).update(x);
  }

  addAfiliado(x: queja): Promise<DocumentReference>{
    return this.quejaCollection.add(x)
  }

  deleteAfiliado(id: string): Promise<void>{
    return this.quejaCollection.doc(id).delete();
  }
}
