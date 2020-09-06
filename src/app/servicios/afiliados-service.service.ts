import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

import { afiliado } from '../models/afiliados-interface';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosServiceService {

  private afiliadoCollection: AngularFirestoreCollection<afiliado>;
  private afiliados: Observable<afiliado[]>;

  constructor(private db:AngularFirestore) { 
    this.afiliadoCollection = this.db.collection<afiliado>('afiliados');

    this.afiliados = this.afiliadoCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ... data};
        });
      }
    ));
  }

  listar() {
    return this.db.collection<afiliado>('afiliados').valueChanges();
  }

  recuperarDatos(): Observable<afiliado[]>{
    return this.db
      .collection('afiliados')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as afiliado;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  getAfiliados() : Observable<afiliado[]>{
    return this.afiliados;
  }

  getAfiliado(id : string) : Observable<afiliado>{
    return this.afiliadoCollection.doc<afiliado>(id).valueChanges().pipe(
      take(1),
      map(x => {
        x.id = id
        return x;
      })
    )
  }

  updateAfiliado(id: string, x : afiliado): Promise<void>{
    return this.afiliadoCollection.doc(id).update(x);
  }

  addAfiliado(x: afiliado): Promise<DocumentReference>{
    return this.afiliadoCollection.add(x)
  }

  deleteAfiliado(id: string): Promise<void>{
    return this.afiliadoCollection.doc(id).delete();
  }
}
