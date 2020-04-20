import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  public email:string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  goRegreso(){
    this.router.navigate(['/home'])
  }

  restablecerContra(){
    this.authService.restablecerContra(this.email)
    this.router.navigate(['/home'])
  }

}
