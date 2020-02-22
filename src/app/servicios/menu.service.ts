import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface menu{

  id:string
  entrada:string
  segundo:string
  jugo:string
  precio:string
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private db:AngularFirestore) { }

  getMenus(){

    return this.db.collection("menu").snapshotChanges().pipe(map(res => {
      return res.map(x => {
        const data = x.payload.doc.data() as menu;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }
}
