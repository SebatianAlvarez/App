import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { desayuno } from '../models/desayuno-interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private desayunoCollection: AngularFirestoreCollection<desayuno>;
  private desayunos: Observable<desayuno[]>;

  constructor(private db:AngularFirestore) { 
    this.desayunoCollection = this.db.collection<desayuno>('platoDesayuno');
    this.desayunos = this.desayunoCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ... data};
        });
      }
    ));
  }

  getDesayunos() : Observable<desayuno[]>{
    return this.desayunos;
  }

  getDesayuno(id : string) : Observable<desayuno>{
    return this.desayunoCollection.doc<desayuno>(id).valueChanges().pipe(
      take(1),
      map(menu => {
        menu.id = id
        return menu;
      })
    )
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

  getDesas(){
    return this.db.collection("platoDesayuno").snapshotChanges().pipe(map(plato => {
      return plato.map(x => {
        const data = x.payload.doc.data() as desayuno;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }

  recuperarDatos(): Observable<desayuno[]>{
    return this.db
      .collection('platoDesayuno')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as desayuno;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }
  


}
