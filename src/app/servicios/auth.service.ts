import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario-interface';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { auth } from 'firebase'



@Injectable({
  providedIn: 'root'
})

export class AuthService {



  usuariocolencion: AngularFirestoreCollection<Usuario>;

  constructor(private AFauth: AngularFireAuth, private db:AngularFirestore,
    private router:Router, private google:GooglePlus ) {

      this.usuariocolencion = db.collection<Usuario>('usuarios');

     }

  async login(email:string, password:string){
    return await this.AFauth.auth.signInWithEmailAndPassword(email, password).then(res =>{
      console.log("que es", email, password);
      
      this.actualizarUsuario(res.user);
      
      if(res.user.emailVerified){
        // this.actualizarUsuario(res.user);
        this.router.navigate(['listado'])
      } else{
        this.router.navigate(['verificar-email'])
      }
    });
  }

  getUsu(id : string) : Observable<Usuario>{
    return this.usuariocolencion.doc<Usuario>(id).valueChanges().pipe(
      take(1),
      map(menu => {
        menu.uid = id
        return menu;
      })
    )
  }

  async register(email:string, password:string, nombre:string, numero:string, apellido:string){
    
    return await this.AFauth.auth.createUserWithEmailAndPassword(email,password).then(res =>{
      const uid = res.user.uid;
      console.log("s", uid);
      // console.log("s", usuario.uid);
      

      const userRef : AngularFirestoreDocument<Usuario> = this.db.doc(`usuarios/${uid}`);
      userRef.valueChanges().subscribe(data =>{
        console.log("existe aqui?", data);
      console.log("X", uid);
        
        const datos : Usuario = {
          uid: uid,
          email: email,
          roles: 'cliente',
          numero : numero,
          nombre: nombre,
          apellido: apellido
          
        }
        return userRef.set(datos);
      })
      console.log("se registro??", res.user.emailVerified );
      

      if(res.user.emailVerified){
        // this.enviarEmailVerificacion()
        this.router.navigate(['home'])
      } else {
        this.router.navigate(['home'])
      }
      //  this.router.navigate(['home'])
      
    });
    

  }

  enviarEmailVerificacion(){
    return this.AFauth.auth.currentUser.sendEmailVerification()
  }

  actualizarUsuario(usuario:any){
    
    const userRef : AngularFirestoreDocument<Usuario> = this.db.doc(`usuarios/${usuario.uid}`);

    userRef.valueChanges().subscribe(data =>{
      console.log("existe data?", data);
      
      if(data){
        console.log("existe");
        
        const datos : Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          roles: data.roles,
          numero : data.numero,
          nombre: data.nombre,
          apellido: data.apellido,
          foto: data.foto
        }
        return userRef.set(datos);
      }else{
        console.log("no existe", data);
        
        const datos : Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          roles: 'cliente',
          foto: "",
          //apellido: data.apellido,
          //numero : '555555',
          // nombre: 'k'
        }
        return userRef.set(datos);
      }
    });
  }

  guardarUsuario(usuario:any, nombre:string, numero:string){
    
    const userRef : AngularFirestoreDocument<Usuario> = this.db.doc(`usuarios/${usuario.uid}`);

    userRef.valueChanges().subscribe(data =>{
      console.log("existe data?", data);

        console.log("no existe", data);
        
        const datos : Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          roles: 'cliente',
          numero : '555555',
          foto: "",
          // nombre: 'k'
        }
        return userRef.set(datos);
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

  listar() {
    return this.db.collection<Usuario>('usuarios').valueChanges();
  }

  /*  alt+96 = `
  */

  logout(){
    this.AFauth.auth.signOut().then(() =>{
      this.google.disconnect();
      this.router.navigate(['/home']);
      window.location.reload(true);
    })
  }

  restablecerContra(email:string){
    this.AFauth.auth.sendPasswordResetEmail(email);
  }

  getUserLog(){
    return this.AFauth.authState
  }

  getUserLog2(){
    return this.AFauth.auth.currentUser
  }

  updateUser(id: string, x : Usuario): Promise<void>{
    return this.usuariocolencion.doc(id).update(x);
  }

  loginGoogle(){
    return this.google.login({}).then( (res) =>{
      const user_data_google = res;
     return this.AFauth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken));
    })
  }

}
