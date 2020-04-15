import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private db:AngularFirestore,
    private router:Router) { }

  login(email:string, password:string){

    return new Promise((resolve, rejected) =>{
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));

    } )

    
  }

  register(email:string, password:string, nombre:string, numero:string){
    
    return new Promise ((resolve, reject) =>{
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
        this.db.collection('clientes').doc(res.user.uid).set({
          nombre : nombre,
          numero : numero,
          email : email,
          password : password
        })
        resolve(res)
      }).catch(err => reject(err))
    })

  }

  logout(){
    this.AFauth.auth.signOut().then(() =>{
      this.router.navigate(['/home'])
    })
  }

}
