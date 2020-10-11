import { Injectable } from '@angular/core';
import { Foto } from '../models/fotos-interface';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  private fotoCollection: AngularFirestoreCollection<Foto>;

  public currentUser = this.AFauth.auth.currentUser;
  private fotos: Observable<Foto[]>;
  public usuarioLog;

  constructor(private db:AngularFirestore, private AFauth : AngularFireAuth, private router: Router) {

    // Revisar este error, de alguna manera se controla aqui
    if(this.currentUser == null){
      console.log("Sin usuario");
      this.router.navigate(['/home']);
    }else if(this.currentUser != null){
      this.usuarioLog = this.currentUser.uid;
    }


    this.fotoCollection = this.db.collection<Foto>('imagenesUsuario');
    this.fotos = this.fotoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
   }


   // ******** METODOS PARA MOSTRAR Y EDITAR EL MENU **********
   // retorna la coleccion
  getTodosDesayunos(){
    return this.fotos;
  }

  // retorna solo una coleccion
  getDesayunoCollection(id: string){
    return this.fotoCollection.doc<Foto>(id).valueChanges();
  }

  updateDesayun(des :Foto, id: string){
    return this.fotoCollection.doc(id).update(des);
  }

  addDesayunos(des: Foto){
    return this.fotoCollection.add(des);
  }

  removerDesayuno(id: string){
    return this.fotoCollection.doc(id).delete();
  }

  // ******* FIN DE LOS METODOS, VALIDAR SI SE USA LO DEMAS **********



  // Con esto listo la colección
  listar() {
    return this.db.collection<Foto>('imagenesUsuario').valueChanges();
  }

  updateDesayuno(id: string, menu : Foto): Promise<void>{
    return this.fotoCollection.doc(id).update(menu);
  }

  addDesayuno(menu: Foto): Promise<DocumentReference>{
    return this.fotoCollection.add(menu)
  }

  deleteDesayuno(id: string): Promise<void>{
    return this.fotoCollection.doc(id).delete();
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
}
