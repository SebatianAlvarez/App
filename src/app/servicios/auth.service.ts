import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario-interface';



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
      if(res.user.emailVerified){
        this.actualizarUsuario(res.user);
        this.router.navigate(['listado'])
      } else{
        this.router.navigate(['verificar-email'])
      }
      
    });
  }

  register(email:string, password:string, nombre:string, numero:string){
    
    return this.AFauth.auth.createUserWithEmailAndPassword(email,password).then(res =>{

      

      if(res.user.emailVerified){
        this.db.collection('usuarios').doc(`usuarios/${res.user.uid}`).set({
          uid : res.user.uid,
          email : email,
          roles: 'cliente',
          numero : numero,
          nombre : nombre
        });
        this.enviarEmailVerificacion()
        this.router.navigate(['home'])
      } else {
        this.router.navigate(['verificar-email'])
      }
      
    });

  }

  enviarEmailVerificacion(){
    return this.AFauth.auth.currentUser.sendEmailVerification()
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
          roles: 'cliente',
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

    return this.db.collection<Usuario>('usuarios').valueChanges();
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
      window.location.reload(true);
      this.router.navigate(['/home']);
    })
  }

  restablecerContra(email:string){
    this.AFauth.auth.sendPasswordResetEmail(email);
  }

}
