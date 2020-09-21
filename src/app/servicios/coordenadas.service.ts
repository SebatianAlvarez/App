import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

import { coordenadas } from '../models/coordenadas-interface'

@Injectable({
  providedIn: 'root'
})
export class CoordenadasService {

  private coordenadasCollection: AngularFirestoreCollection;
  private coordenadas: Observable<coordenadas[]>;

  constructor(private db:AngularFirestore) { 
    this.coordenadasCollection = this.db.collection<coordenadas>('coordenadas');
  }

  listar() {
    return this.db.collection<coordenadas>('coordenadas').valueChanges();
  }

  recuperarDatos(): Observable<coordenadas[]>{
    return this.db
      .collection('coordenadas')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as coordenadas;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  getCoordenadas() : Observable<coordenadas[]>{
    return this.coordenadas;
  }

  getCoordenada(id : string) : Observable<coordenadas>{
    return this.coordenadasCollection.doc<coordenadas>(id).valueChanges().pipe(
      take(1),
      map(x => {
        x.uid = id
        return x;
      })
    )
  }

  updateCoordenada(id: string, x : coordenadas): Promise<void>{
    return this.coordenadasCollection.doc(id).update(x);
  }

  addACoordenadas(x: coordenadas): Promise<DocumentReference>{
    return this.coordenadasCollection.add(x)
  }

  deleteCoordenadas(id: string): Promise<void>{
    return this.coordenadasCollection.doc(id).delete();
  }

}
