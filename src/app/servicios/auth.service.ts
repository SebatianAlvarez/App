import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

interface Usuario{

  uid:string,
  email:string,
  roles:string[]
}

export interface menuApp{
  idMenu: string,
  icono: string,
  nombre: string,
  url: string,
  roles: string[]
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private AFauth: AngularFireAuth, private db:AngularFirestore,
    private router:Router) { }

  login(email:string, password:string){
    return this.AFauth.auth.signInWithEmailAndPassword(email, password).then(res =>{
      this.actualizarUsuario(res.user);
    });
  }

  register(email:string, password:string){
    
    return this.AFauth.auth.createUserWithEmailAndPassword(email,password);

  }

  actualizarUsuario(usuario:any){
    const userRef : AngularFirestoreDocument<Usuario> = this.db.doc(`usuarios/${usuario.uid}`);

    userRef.valueChanges().subscribe(data =>{
      if(data){
        const datos : Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          roles: data.roles
        }
        return userRef.set(datos);
      }else{
        const datos : Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          roles: ['cliente']
        }
        return userRef.set(datos);
      }
      
      
    });
  }

  /*  alt+96 = `

  register(email:string, password:string){
    
    return new Promise ((resolve, reject) =>{
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
        this.db.collection('usuarios').doc(res.user.uid).set({
          email : email,
          uid : res.user.uid,
          roles : ['cliente']
        })
        resolve(res)
      }).catch(err => reject(err))
    })

  }

  */
/*
  register(email:string, password:string, nombre:string, numero:string){
    
    return new Promise ((resolve, reject) =>{
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
        this.db.collection('clientes').doc(res.user.uid).set({
          nombre : nombre,
          numero : numero,
          email : email,
          password : password,
          uid : res.user.uid,
          roles : this.roles
        })
        resolve(res)
      }).catch(err => reject(err))
    })

  }
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
