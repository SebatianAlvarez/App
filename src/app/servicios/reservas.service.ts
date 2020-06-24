import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Reserva } from '../models/reserva-interface'

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private reservasCollection : AngularFirestoreCollection<Reserva>;
  private reservas : Observable<Reserva[]>;

  constructor(private db: AngularFirestore ) {

    this.reservasCollection = this.db.collection<Reserva>('reservas');
    this.reservas = this.reservasCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
   }

   getReservas() : Observable<Reserva[]>{
     return this.reservas;
   }

   getReserva(id : string) : Observable<Reserva>{
     return this.reservasCollection.doc<Reserva>(id).valueChanges().pipe(
       take(1),
       map(reserva =>{
         reserva.uid = id;
         return reserva
       })
     );
   }

   updateReserva(id: string, reserva : Reserva):Promise<void>{
     return this.reservasCollection.doc(id).update(reserva);
   }

   addReserva(reserva: Reserva) : Promise<DocumentReference>{
     return this.reservasCollection.add(reserva);
   }

   deleteReserva(id:string): Promise<void>{
     return this.reservasCollection.doc(id).delete();
   }

   recuperarDatos(): Observable<Reserva[]>{
    return this.db
      .collection('usuarios')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Reserva;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

}
