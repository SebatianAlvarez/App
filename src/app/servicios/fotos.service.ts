import { Injectable } from '@angular/core';
import { Foto } from '../models/fotos-interface';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map ,take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  private fotoCollection: AngularFirestoreCollection<Foto>;
  private fotos: Observable<Foto[]>;

  constructor(private db:AngularFirestore) { 
    this.fotoCollection = this.db.collection<Foto>('imagenesUsuario');

    //this.afiliados = this.afiliadoCollection.snapshotChanges().pipe(map(
    //  actions => {
    //    return actions.map( x => {
    //      const data = x.payload.doc.data();
    //      const id = x.payload.doc.id;
    //      return {id, ... data};
    //    });
    //  }
    //));
  }

  listar() {
    return this.db.collection<Foto>('imagenesUsuario').valueChanges();
  }

  recuperarDatos(): Observable<Foto[]>{
    return this.db
      .collection('imagenesUsuario')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Foto;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  getFotos() : Observable<Foto[]>{
    return this.fotos;
  }

  getFoto(id : string) : Observable<Foto>{
    return this.fotoCollection.doc<Foto>(id).valueChanges().pipe(
      take(1),
      map(x => {
        x.id = id
        return x;
      })
    )
  }

}
