import { Injectable } from '@angular/core';
import { desayuno } from '../models/desayuno-interface';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DesayunoService {

  private desayunoCollection: AngularFirestoreCollection<desayuno>;


  constructor(private db:AngularFirestore) { }

  // Con esto listo la colección 
  listar() {
    return this.db.collection<desayuno>('platoDesayuno').valueChanges();
  }

  updateDesayuno(id: string, menu : desayuno): Promise<void>{
    return this.desayunoCollection.doc(id).update(menu);
  }

  addDesayuno(menu: desayuno): Promise<DocumentReference>{
    return this.desayunoCollection.add(menu)
  }

  deleteDesayuno(id: string): Promise<void>{
    return this.desayunoCollection.doc(id).delete();
  }

  getDes(){
    return this.db.collection("platoDesayuno").snapshotChanges().pipe(map(plato => {
      return plato.map(x => {
        const data = x.payload.doc.data() as desayuno;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }
}
