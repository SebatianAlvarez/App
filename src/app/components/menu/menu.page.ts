import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public entrada:string
  public segundo:string
  public jugo:string
  public precio:string

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  }

  actualizarMenu(){

    return new Promise<any>((resolve, reject) => {
      this.db.collection('menu').add({
        entrada:this.entrada,
        segundo:this.segundo,
        jugo:this.jugo,
        precio:this.precio,
      }).then((res) =>{
        resolve(res)
      }).catch(err => reject(err))
    })

  }

}
