import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { almuerzo } from '../models/almuerzo-interface';

@Injectable({
  providedIn: 'root'
})
export class AlmuerzoService {

  private almuerzoCollection: AngularFirestoreCollection<almuerzo>;
  private almuerzos: Observable<almuerzo[]>;

  constructor(private db:AngularFirestore) { 
    this.almuerzoCollection = this.db.collection<almuerzo>('platoAlmuerzo');
    this.almuerzos = this.almuerzoCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ... data};
        });
      }
    ));
  }

  getAlmuerzos() : Observable<almuerzo[]>{
    return this.almuerzos;
  }

  getAlmuerzo(id : string) : Observable<almuerzo>{
    return this.almuerzoCollection.doc<almuerzo>(id).valueChanges().pipe(
      take(1),
      map(menu => {
        menu.id = id
        return menu;
      })
    )
  }

  updateAlmuerzo(id: string, menu : almuerzo): Promise<void>{
    return this.almuerzoCollection.doc(id).update(menu);
  }

  addAlmuerzo(menu: almuerzo): Promise<DocumentReference>{
    return this.almuerzoCollection.add(menu)
  }

  deleteAlmuerzo(id: string): Promise<void>{
    return this.almuerzoCollection.doc(id).delete();
  }

  getAlmu(){
    return this.db.collection("platoAlmuerzo").snapshotChanges().pipe(map(plato => {
      return plato.map(x => {
        const data = x.payload.doc.data() as almuerzo;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }
}
