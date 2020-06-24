import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

import { platos } from '../models/platos-interface';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menusCollection: AngularFirestoreCollection<platos>;
  private menus: Observable<platos[]>;

  constructor(private db:AngularFirestore) { 
    this.menusCollection = this.db.collection<platos>('plato');
    this.menus = this.menusCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ... data};
        });
      }
    ));
  }

  getMenus() : Observable<platos[]>{
    return this.menus;
  }

  getMenu(id : string) : Observable<platos>{
    return this.menusCollection.doc<platos>(id).valueChanges().pipe(
      take(1),
      map(menu => {
        menu.id = id
        return menu;
      })
    )
  }

  updateMenu(id: string, menu : platos): Promise<void>{
    return this.menusCollection.doc(id).update(menu);
  }

  addMenu(menu: platos): Promise<DocumentReference>{
    return this.menusCollection.add(menu)
  }

  deleteMenu(id: string): Promise<void>{
    return this.menusCollection.doc(id).delete();
  }

  getPlatos(){
    return this.db.collection("plato").snapshotChanges().pipe(map(plato => {
      return plato.map(x => {
        const data = x.payload.doc.data() as platos;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }
  


}
