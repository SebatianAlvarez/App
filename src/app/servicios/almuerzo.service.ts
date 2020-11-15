import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { almuerzo } from '../models/almuerzo-interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlmuerzoService {

  private almuerzoCollection: AngularFirestoreCollection<almuerzo>;
  private almuerzos: Observable<almuerzo[]>;

  public currentUser = this.AFauth.auth.currentUser;
  public usuarioLog


  constructor(private db:AngularFirestore, private AFauth : AngularFireAuth, private router: Router) { 


    // Revisar este error, de alguna manera se controla aqui
    if(this.currentUser == null){
      console.log("Sin usuario");
      this.router.navigate(['/home']);
    }else if(this.currentUser != null){
      this.usuarioLog = this.currentUser.uid;
    }

    this.almuerzoCollection = this.db.collection<almuerzo>('platoAlmuerzo');
    this.almuerzos = this.almuerzoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  // retorna la coleccion 
  getTodosAlmuerzos(){
    return this.almuerzos;
  }

  // retorna solo una coleccion
  getAlmuerzoCollection(id: string){
    return this.almuerzoCollection.doc<almuerzo>(id).valueChanges();
  }

  updateAlmuerzos(almu :almuerzo, id: string){
    return this.almuerzoCollection.doc(id).update(almu);
  }
  
  addAlmuerzos(almu: almuerzo){
    return this.almuerzoCollection.add(almu);
  }

  addAlmuerzoNuevo(almu: almuerzo) {
    
    let idPlato = this.db.createId();
    almu.id = idPlato;
    return this.db.collection('platoAlmuerzo').doc(idPlato).set({
      id: idPlato,
      userUID: this.usuarioLog,
      estado: "Activo",
      tipoAlmuerzo: almu.tipoAlmuerzo,
      entradaAlmuerzo: almu.entradaAlmuerzo,
      segundoAlmuerzo: almu.segundoAlmuerzo,
      jugoAlmuerzo: almu.jugoAlmuerzo,
      precioAlmuerzo: almu.precioAlmuerzo,
    });
   }
  
  removeAlmuerzo(id: string){
    return this.almuerzoCollection.doc(id).delete();
  }

  // hasta aqui otra idea

  getAlmuerzos() : Observable<almuerzo[]>{
    return this.almuerzos;
  }

  // Con esto listo la colección 
  listar() {
    return this.db.collection<almuerzo>('platoAlmuerzo').valueChanges();
  }

  getAlmuerzo(id : string) : Observable<almuerzo>{
    return this.almuerzoCollection.doc<almuerzo>(id).valueChanges().pipe(
      take(1),
      map(menu => {
        menu.id = id
        return menu;
      })
    )
  }

  updateAlmuerzo(id: string, menu : almuerzo): Promise<void>{
    return this.almuerzoCollection.doc<almuerzo>(id).update(menu);
  }

  addAlmuerzo(menu: almuerzo): Promise<DocumentReference>{
    return this.almuerzoCollection.add(menu)
  }

  deleteAlmuerzo(id: string): Promise<void>{
    return this.almuerzoCollection.doc(id).delete();
  }

  getAlmu(){
    return this.db.collection("platoAlmuerzo").snapshotChanges().pipe(map(plato => {
      return plato.map(x => {
        const data = x.payload.doc.data() as almuerzo;
        data.id = x.payload.doc.id;
        return data;
      })
    }))
  }

  recuperarDatos(): Observable<almuerzo[]>{
    return this.db
      .collection('platoAlmuerzo')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as almuerzo;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  subirMenu(almu: almuerzo, id?: string): void{    
    this.guardarEspecial(almu);
  }

  guardarEspecial(platoAlm: almuerzo) {

    //this.idRes =perfil.id;
    let idExiste = platoAlm.id;
    platoAlm.id = idExiste;
    console.log("idExiste??", idExiste);
    console.log("idExiste222??", platoAlm.id);
    
    if(idExiste){
      const menuAlmObj = {
        id: idExiste,
        userUID: this.usuarioLog,
        estado: platoAlm.estado,
        entradaAlmuerzo: platoAlm.entradaAlmuerzo,
        jugoAlmuerzo: platoAlm.jugoAlmuerzo, 
        precioAlmuerzo: platoAlm.precioAlmuerzo,
        segundoAlmuerzo: platoAlm.segundoAlmuerzo,
        tipoAlmuerzo: platoAlm.tipoAlmuerzo
      };
      return this.almuerzoCollection.doc(platoAlm.id).update(menuAlmObj);      
    }else{      
      let idPlato = this.db.createId();
      platoAlm.id = idPlato;
      this.db.collection('platoAlmuerzo').doc(idPlato).set({
        id: platoAlm.id,
        userUID: this.usuarioLog,
        estado: 'Activo',
        entradaAlmuerzo: platoAlm.entradaAlmuerzo,
        jugoAlmuerzo: platoAlm.jugoAlmuerzo, 
        precioAlmuerzo: platoAlm.precioAlmuerzo,
        segundoAlmuerzo: platoAlm.segundoAlmuerzo,
        tipoAlmuerzo: platoAlm.tipoAlmuerzo
      });
    }
  }


}
