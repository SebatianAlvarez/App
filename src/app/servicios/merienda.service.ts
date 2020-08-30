import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { merienda } from '../models/merienda-interface'

@Injectable({
  providedIn: 'root'
})
export class MeriendaService {

  private meriendaCollection: AngularFirestoreCollection<merienda>;
  private meriendas: Observable<merienda[]>;

  constructor(private db:AngularFirestore) { 
    this.meriendaCollection = this.db.collection<merienda>('platoMerienda');
    this.meriendas = this.meriendaCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ... data};
        });
      }
    ));
  }

  getMeriendas() : Observable<merienda[]>{
    return this.meriendas;
  }

  getMerienda(id : string) : Observable<merienda>{
    return this.meriendaCollection.doc<merienda>(id).valueChanges().pipe(
      take(1),
      map(menu => {
        menu.id = id
        return menu;
      })
    )
  }

  updateMerienda(id: string, menu : merienda): Promise<void>{
    return this.meriendaCollection.doc(id).update(menu);
  }

  addMerienda(menu: merienda): Promise<DocumentReference>{
    return this.meriendaCollection.add(menu)
  }

  deleteMerienda(id: string): Promise<void>{
    return this.meriendaCollection.doc(id).delete();
  }

  getMeri(){
    return this.db.collection("platoMerienda").snapshotChanges().pipe(map(plato => {
      return plato.map(x => {
        const data = x.payload.doc.data() as merienda;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }

}
