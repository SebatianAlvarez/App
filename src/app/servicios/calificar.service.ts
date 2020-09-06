import { Injectable } from '@angular/core';
import { pregunta } from '../models/preguntas';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalificarService {

  private caliCollection : AngularFirestoreCollection<pregunta>;
  private calis : Observable<pregunta[]>;

  constructor(private db:AngularFirestore) {
    this.caliCollection = this.db.collection<pregunta>('calificaciones');

  }


  listar() {
    return this.db.collection<pregunta>('calificaciones').valueChanges();
  }

   getCalificaciones() : Observable<pregunta[]>{
     return this.calis;
   }

   getCalificacion(id : string) : Observable<pregunta>{
     return this.caliCollection.doc<pregunta>(id).valueChanges().pipe(
       take(1),
       map(x =>{
         x.id = id;
         return x
       })
     );
   }

   updateCalificacion(id: string, reserva : pregunta):Promise<void>{
     return this.caliCollection.doc(id).update(reserva);
   }

   addCalificacion(reserva: pregunta) : Promise<DocumentReference>{
     return this.caliCollection.add(reserva);
   }

   deleteCalificacion(id:string): Promise<void>{
     return this.caliCollection.doc(id).delete();
   }

   recuperarDatos(): Observable<pregunta[]>{
    return this.db
      .collection('calificaciones')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as pregunta;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

}
