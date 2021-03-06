import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from  '@angular/fire/auth';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PruebaGuard implements CanActivate {

  constructor(private AFauth: AngularFireAuth, private router:Router){

  }


  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      return this.AFauth.authState.pipe(map(auth => {
        if(auth.emailVerified === true){
          this.router.navigate(['/perfil'])
        }else{
          
          //this.router.navigate(['/perfil'])
          this.router.navigate(['/home'])
          //window.location.reload()
          return false
        }
      }))
    }
  
}
