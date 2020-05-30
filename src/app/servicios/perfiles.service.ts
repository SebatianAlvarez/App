import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { Usuario } from '../models/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  private usuarios: Observable<Usuario[]>;

  constructor(private db : AngularFirestore) { 
    this.usuariosCollection = this.db.collection<Usuario>('usuarios');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  getUsuarios() : Observable<Usuario[]>{

    return this.usuarios;
  }

  getUsuario(id : string) : Observable<Usuario> {
    return this.usuariosCollection.doc<Usuario>(id).valueChanges().pipe(
      take(1),
      map(usuario => {
        usuario.uid = id
        return usuario;
      })
    );
  }

  updateUsuario(id : string, usuario : Usuario): Promise<void>{
    return this.usuariosCollection.doc(id).update(usuario);
  }


  addUsuario(usuario: Usuario): Promise<DocumentReference>{
    return this.usuariosCollection.add(usuario)
  }

  deleteUsuario(id: string): Promise<void>{
    return this.usuariosCollection.doc(id).delete();
  }


}


