import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Usuario{

  uid:string,
  email:string,
  roles:string[],
  numero:string,
  nombre:string,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  usuariocolencion: AngularFirestoreCollection<Usuario>;

  constructor(private AFauth: AngularFireAuth, private db:AngularFirestore,
    private router:Router) {

      this.usuariocolencion = db.collection<Usuario>('usuarios');
     }

  login(email:string, password:string){
    return this.AFauth.auth.signInWithEmailAndPassword(email, password).then(res =>{
      this.actualizarUsuario(res.user);
    });
  }

  register(email:string, password:string, nombre:string, numero:string){
    
    return this.AFauth.auth.createUserWithEmailAndPassword(email,password).then(res =>{
      this.db.collection('usuarios').doc(res.user.uid).set({
        uid : res.user.uid,
        email : email,
        roles: ['cliente'],
        numero : numero,
        nombre : nombre
      })
    })

  }

  actualizarUsuario(usuario:any){
    
    const userRef : AngularFirestoreDocument<Usuario> = this.db.doc(`usuarios/${usuario.uid}`);

    userRef.valueChanges().subscribe(data =>{
      if(data){
        const datos : Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          roles: data.roles,
          numero : data.numero,
          nombre: data.nombre
        }
        return userRef.set(datos);
      }else{
        const datos : Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          roles: ['cliente'],
          numero : data.numero,
          nombre: data.nombre
        }
        return userRef.set(datos);
      }
    });
  }

  recuperarDatos(): Observable<Usuario[]>{
    return this.db
      .collection('usuarios')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Usuario;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  getUsuario(){
    return this.db.collection('usuarios').snapshotChanges().pipe(map(usu => {
      return usu.map(x => {
        const data = x.payload.doc.data() as Usuario;
        data.uid = x.payload.doc.id;
        return data;
      })
    }))
  }

  editarUsuario(usuario:Usuario){

    return this.usuariocolencion.doc(usuario.uid).update(usuario)
  }

  getUser(){
    return this.db.collection('usuarios').snapshotChanges()
  }

  /*  alt+96 = `
  */

  logout(){
    this.AFauth.auth.signOut().then(() =>{
      this.router.navigate(['/home'])
    })
  }

  restablecerContra(email:string){
    this.AFauth.auth.sendPasswordResetEmail(email);
  }

}
