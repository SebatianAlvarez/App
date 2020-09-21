import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { comentarios } from '../models/comentarios-interface';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private comentariosCollection : AngularFirestoreCollection<comentarios>;
  private comentarios : Observable<comentarios[]>;

  constructor(private db: AngularFirestore) {
    this.comentariosCollection = this.db.collection<comentarios>('comentarios');
   }

   listar() {
    return this.db.collection<comentarios>('comentarios').valueChanges();
  }

   getReservas() : Observable<comentarios[]>{
     return this.comentarios;
   }

   getReserva(id : string) : Observable<comentarios>{
     return this.comentariosCollection.doc<comentarios>(id).valueChanges().pipe(
       take(1),
       map(comentario =>{
        comentario.uid = id;
         return comentario
       })
     );
   }

   updateReserva(id: string, reserva : comentarios):Promise<void>{
     return this.comentariosCollection.doc(id).update(reserva);
   }

   addReserva(reserva: comentarios) : Promise<DocumentReference>{
     return this.comentariosCollection.add(reserva);
   }

   deleteReserva(id:string): Promise<void>{
     return this.comentariosCollection.doc(id).delete();
   }

   recuperarDatos(): Observable<comentarios[]>{
    return this.db
      .collection('comentarios')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as comentarios;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

}
