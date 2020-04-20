import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface menu{

  id:string
  entrada:string
  segundo:string
  jugo:string
  precio:string
}

export interface menuApp{
  idmenu: string,
  nombre: string,
  icono: string,
  url: string,
  roles: string[]
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<menuApp[]>();

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

  /*
  listar(){
    return this.db.collection<menuApp>('menusapp').valueChanges();
  }
  */

  getListar(){
    return this.db.collection('menusapp').snapshotChanges().pipe(map(res => {
      return res.map(x => {
        const data = x.payload.doc.data() as menuApp;
        data.idmenu = x.payload.doc.id;
        return data;
      })
    }))
  }

}
