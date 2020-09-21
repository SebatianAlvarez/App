import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { especial } from '../models/especial-interface';

@Injectable({
  providedIn: 'root'
})
export class MeriendaService {

  private meriendaCollection: AngularFirestoreCollection<especial>;
  private meriendas: Observable<especial[]>;

  constructor(private db:AngularFirestore) { 
    this.meriendaCollection = this.db.collection<especial>('platoEspecial');
    // this.meriendas = this.meriendaCollection.snapshotChanges().pipe(map(
    //   actions => {
    //     return actions.map( x => {
    //       const data = x.payload.doc.data();
    //       const id = x.payload.doc.id;
    //       return {id, ... data};
    //     });
    //   }
    // ));
  }

  getMeriendas() : Observable<especial[]>{
    return this.meriendas;
  }

  getMerienda(id : string) : Observable<especial>{
    return this.meriendaCollection.doc<especial>(id).valueChanges().pipe(
      take(1),
      map(menu => {
        menu.id = id
        return menu;
      })
    )
  }

  // Con esto listo la colección 
  listar() {
    return this.db.collection<especial>('platoEspecial').valueChanges();
  }

  updateMerienda(id: string, menu : especial): Promise<void>{
    return this.meriendaCollection.doc(id).update(menu);
  }

  addMerienda(menu: especial): Promise<DocumentReference>{
    return this.meriendaCollection.add(menu)
  }

  deleteMerienda(id: string): Promise<void>{
    return this.meriendaCollection.doc(id).delete();
  }

  getMeri(){
    return this.db.collection("platoEspecial").snapshotChanges().pipe(map(plato => {
      return plato.map(x => {
        const data = x.payload.doc.data() as especial;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }

  recuperarDatos(): Observable<especial[]>{
    return this.db
      .collection('platoEspecial')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as especial;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

}
