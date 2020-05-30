import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

//crear el objeto

export interface resta {

  capacidadRestaurante : string
  direccionRestaurante : any
  fileRef: string
  fotoRestaurante : string
  horarioRestaurante : string
  id : string
  imagenRes: string
  nombreRestaurante : string
  tipoRestaurante: string
  userUID: string

}

export interface promos {
  
  fileRef : string
  id : string
  imagenRes : string
  userUID: string
}

export interface platos {
  detalleDesayuno : string
  entradaAlmuerzo: string
  id : string
  imgPlato : string
  jugoAlmuerzo : string
  precioAlmuerzo: string
  precioDesayuno : string
  segundoAlmuerzo : string
  userUID: string
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(private db: AngularFirestore) { }

  //consulta a la base

  getRestaurantes(){
    return this.db.collection("perfiles").snapshotChanges().pipe(map(res => {
      return res.map(x => {
        const data = x.payload.doc.data() as resta;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }

  getDireccion(){
    return this.db.collection("restaurantes").snapshotChanges().pipe(map(res => {
      return res.map(x => {
        const data = x.payload.doc.data() as resta;
        data.id = x.payload.doc.id;
        return data.direccionRestaurante;
      })
    }))
  }

  getPromos(){
    return this.db.collection("promociones").snapshotChanges().pipe(map(pro => {
      return pro.map(x => {
        const data = x.payload.doc.data() as promos;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
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
