import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

import { pregunta } from '../models/preguntas'

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  
  private preguntasCollection: AngularFirestoreCollection<pregunta>;
  private preguntas: Observable<pregunta[]>;

  constructor(private db:AngularFirestore) {
    this.preguntasCollection = this.db.collection<pregunta>('preguntas');
    this.preguntas = this.preguntasCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(x => {
          const data  = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ... data};
        });
      }
    ));
   }

   getPreguntas() : Observable<pregunta[]>{
    return this.preguntas;
  }
}
