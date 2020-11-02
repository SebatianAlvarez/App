import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { especial } from '../models/especial-interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MeriendaService {

  private meriendaCollection: AngularFirestoreCollection<especial>;
  private especial: Observable<especial[]>;

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

    this.meriendaCollection = this.db.collection<especial>('platoEspecial');

    this.especial = this.meriendaCollection.snapshotChanges().pipe(
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
  getPlatosEspeciales(){
    return this.especial;
  }

  // retorna solo una coleccion
  getEspecial(id: string){
    return this.meriendaCollection.doc<especial>(id).valueChanges();
  }

  updateEspecial(espe :especial, id: string){
    return this.meriendaCollection.doc(id).update(espe);
  }
  
  addEspecial(espe: especial){
    return this.meriendaCollection.add(espe);
  }

  addEspecialNuevo(espe: especial) {
    
    let idPlato = this.db.createId();
    espe.id = idPlato;
    return this.db.collection('platoEspecial').doc(idPlato).set({
      id: idPlato,
      userUID: this.usuarioLog,
      platoEspecial: espe.platoEspecial,
      estado: "Activo",
      precioEspecial: espe.precioEspecial,
    });
   }
  
  removeEspecial(id: string){
    return this.meriendaCollection.doc(id).delete();
  }

  subirMenu(espe: especial, id?: string): void{    
    this.guardarEspecial(espe);
  }

  guardarEspecial(platoEsp: especial) {

    //this.idRes =perfil.id;
    let idExiste = platoEsp.id;
    platoEsp.id = idExiste;
    console.log("idExiste??", idExiste);
    console.log("idExiste222??", platoEsp.id);
    
    if(idExiste){
      const menuDesObj = {
        id: idExiste,
        userUID: this.usuarioLog,
        estado: platoEsp.estado,
        platoEspecial: platoEsp.platoEspecial,
        precioEspecial: platoEsp.precioEspecial, 
        ingredientes: platoEsp.ingredientes
      };
      return this.meriendaCollection.doc(platoEsp.id).update(menuDesObj);      
    }else{      
      let idPlato = this.db.createId();
      platoEsp.id = idPlato;
      this.db.collection('platoEspecial').doc(idPlato).set({
        id: platoEsp.id,
        userUID: this.usuarioLog,
        estado: 'Activo',
        platoEspecial: platoEsp.platoEspecial,
        precioEspecial: platoEsp.precioEspecial, 
        ingredientes: platoEsp.ingredientes
      });
    }
  }



  getMeriendas() : Observable<especial[]>{
    return this.especial;
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

  listar2() {
    console.log("valores", this.db.collection<especial>('platoEspecial').valueChanges());
    
    return this.db.collection<especial>('platoEspecial').valueChanges();

  }

  // updateMerienda(id: string, menu : especial): Promise<void>{
  //   return this.meriendaCollection.doc(id).update(menu);
  // }

  // addMerienda(menu: especial): Promise<DocumentReference>{
  //   return this.meriendaCollection.add(menu)
  // }

  // deleteMerienda(id: string): Promise<void>{
  //   return this.meriendaCollection.doc(id).delete();
  // }

  // getMeri(){
  //   return this.db.collection("platoEspecial").snapshotChanges().pipe(map(plato => {
  //     return plato.map(x => {
  //       const data = x.payload.doc.data() as especial;
  //       data.id = x.payload.doc.id;
  //       return data;
  //     })
  //   }))
  // }

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
