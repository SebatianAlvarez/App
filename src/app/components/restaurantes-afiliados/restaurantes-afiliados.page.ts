import { resta } from './../../models/restaurante-interface';
import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { afiliado } from '../../models/afiliados-interface';
import { AfiliadosServiceService } from '../../servicios/afiliados-service.service';
import { RestaurantesService } from '../../servicios/restaurantes.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Reserva } from '../../models/reserva-interface';
import { AngularFirestore} from '@angular/fire/firestore';
import { PerfilesService } from '../../servicios/perfiles.service';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { ComentariosService } from '../../servicios/comentarios.service';
import { comentarios } from '../../models/comentarios-interface';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-restaurantes-afiliados',
  templateUrl: './restaurantes-afiliados.page.html',
  styleUrls: ['./restaurantes-afiliados.page.scss'],
})
export class RestaurantesAfiliadosPage implements OnInit {

  restaurante$: Observable<resta[]>;
  afiliados$: Observable<afiliado[]>;
  CurrentDate = new Date()



  // busqueda
  public resList: any[];

  suma : number = 0
  auxi : number = 0

  // variable para validar si hay datos
  existeDatos: boolean;
  listAfiliados: afiliado[] = []
  listRestaurantes: resta[] = []

  usuarioLog: string;
  constructor(private afiliadosSvc: AfiliadosServiceService, public actionSheetController: ActionSheetController,
              private restauranteService: RestaurantesService, private alertController : AlertController,
              private AFauth : AngularFireAuth, private db: AngularFirestore,private formBuilder: FormBuilder,
              private router : Router, private perfilService : PerfilesService,
              private comentarioService : ComentariosService,
              public ActionSheetController: ActionSheetController, private authservice:AuthService,) {

              }

              public calificar = this.formBuilder.group ({

                id: new FormControl (''),
                estrellas: new FormControl ('', [Validators.required]),

              });

              public errorMensajes ={
                comentario : [
                  { type: 'required', message: 'Este campo no puede estar vacio' }
                ]
              };

              public comentar = this.formBuilder.group ({
                id: new FormControl (''),
                comentario: new FormControl('', [Validators.required])

              });

  async ngOnInit() {

    this.existeDatos = false;

    this.resList = await this.initializeItems();

    this.restaurante$ = this.restauranteService.recuperarDatos();
    this.afiliados$ = this.afiliadosSvc.recuperarDatos();



    let currentUser = this.AFauth.auth.currentUser;
    this.usuarioLog = currentUser.uid;

    this.afiliadosSvc.listar().subscribe(a=>{
      this.listAfiliados = []
      this.listRestaurantes = [];

      a.forEach(elementA => {
        this.restauranteService.listar().subscribe(r =>{
          // this.listRestaurantes = [];
          r.forEach(elementR => {
            // this.listRestaurantes = [];
            if(this.usuarioLog == elementA.uidUsu &&  elementR.userUID == elementA.uidResta && elementA.estado === 'verdadero'){
              this.listAfiliados.push(elementA);
              this.listRestaurantes.push(elementR);
              console.log(this.listAfiliados);
              console.log(this.listRestaurantes);
              this.existeDatos = true;
              this.validarDatos(this.existeDatos)              
            }
          });
        })
      });
    })

    console.log("a ver", this.listAfiliados)

  }

  validarDatos(valor: boolean){
    if(valor == true){
      return true
    }else if(valor == false){
      return false
    }
  }

  async initializeItems(): Promise<any> {
    const restaList = await this.db.collection('perfiles')
      .valueChanges().pipe(first()).toPromise();

      return restaList;
  }

  async filterList(evt) {
    this.restaurante$ = await this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.resList = this.resList.filter(Food => {
      if (Food.nombreRestaurante && searchTerm) {
        return (Food.nombreRestaurante.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || Food.tipoRestaurante.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1  );
      }
    });
  }

  goMapa(){
    this.router.navigate(['/listado']);
  }

  async presentModalComentario(id : string){
    const alert = await this.alertController.create({
      header: 'Deja tu Comentario',
      inputs: [
        {
          name: "comentario",
          type: "text",
          placeholder: "Comentario"
        }
      ],
      buttons : [
        {
          text : "Cancelar",
          role : "cancel",
          cssClass : "secondary",
          handler: () =>{

          }
        },{
          text : "Realizar Comentario",
          handler : data =>{
            
            this.presentComentario()
            this.router.navigate(['/listado'])
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
  }

  async presentModal(id : string){
    const alert = await this.alertController.create({
      header: 'Realizar Reserva',
      inputs: [
        {
          name: "mesas",
          type: "number",
          placeholder: "Mesas a Reservar"
        },{
          name: "tiempo",
          type: "number",
          placeholder: "Tiempo estimado para llegar"
        }
      ],
      buttons : [
        {
          text : "Cancelar",
          role : "cancel",
          cssClass : "secondary",
          handler: () =>{

          }
        },{
          text : "Confirmar Reserva",
          handler : data =>{
            let tiempo;
            tiempo = parseInt(data.tiempo)
            if(tiempo < 30){
              this.reservaError();
            }else{
              this.Reservar(data.mesas, data.tiempo ,id);
              this.presentReserva();
            }

          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
  }

  // Mensaje despues de calificar el restaurante
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Gracias por tu opinón',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Reservas
  async presentReserva() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tu reserva sera verificada en minutos',
      // subHeader: 'Subtitle',
      message: 'Puedes ir al menu Mensajes.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentComentario() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Gracias por tu comentario',
      // subHeader: 'Subtitle',
      buttons: ['OK']
    });

    await alert.present();
  }

  async reservaError() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      // subHeader: 'Subtitle',
      message: 'Se debe realizar la reserva con 30 minutos de anticipación',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Calificacion Alert
  async presentAlertConfirm(id1: string, id2: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Deja tu comentario',
      inputs: [
        {
          name: "comentario",
          type: "text",
          placeholder: "Comentario (opcional)"
        }
      ],
      // message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: datos => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: datos => {
            console.log('Confirm Okay');
            const valores: number = this.calificar.value
            let x = valores['estrellas']

            this.restauranteService.getRestaurante(id1).subscribe( data => {


              let a : number = (parseInt(x) + data.calificacion)
              let y : number = data.aux + 1
              let total = (a/y)

              // Guardar en la base con 2 decimales
              let total2 = total.toFixed(2)
              console.log("total", total);
              let totalF = parseFloat(total2)

              console.log("total firebase", totalF);

              this.Comentar(datos.comentario, x ,  id2)
              

              let califica : resta = {
                aux:y,
                calificacion: a,
                promedio : totalF
              }

              this.restauranteService.updateRestaurante(id1, califica)
              this.presentAlert();
              this.router.navigate(['/listado']);


            })
          }
        }
      ]
    });

    await alert.present();
  }

  Reservar(mesa : string, tiempo: string , id : string ){

    let reserva = new Reserva();

    return new Promise<any>((resolve, reject) => {

      let reservaID = this.db.createId();
      reserva.uid = reservaID;
      let usuario = this.perfilService.getUsuario(this.usuarioLog);
      usuario.subscribe(data =>{
        this.db.collection('reservas').doc(reservaID).set({
          uidUsu : this.usuarioLog,
          uidResta : id,
          uid : reserva.uid,
          mesas : mesa,
          tiempo : tiempo,
          nombre : data.nombre,
          numero : data.numero,
          estado : "En Revision"
        }).then((res) =>{
          resolve(res)
        }).catch(err => reject(err))
      })
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.ActionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Reservas',
        icon: 'mail',
        handler: () => {
          this.router.navigate(['tabs-reservas/reserva'])
        }
      },{
        text: 'Cerrar Sesion',
        icon: 'log-out',
        handler: () => {
         this.onLogout();
        }
      }]
    });
    await actionSheet.present();
    let result = await actionSheet.onDidDismiss();
  }

  onLogout(){
    this.authservice.logout();
  }

  Comentar(comen: string,cali : any, id : string){

    let comentario = new comentarios();

    return new Promise<any>((resolve, reject) => {

      let comentarioID = this.db.createId();
      comentario.uid = comentarioID;
      let usuario = this.perfilService.getUsuario(this.usuarioLog);
      usuario.subscribe(data =>{
        const valores = this.comentar.value;

        this.db.collection('comentarios').doc(comentarioID).set({
          uidUsu : this.usuarioLog,
          uidResta : id,
          uid : comentario.uid,
          nombreUsu : data.nombre,
          comentario: comen,
          calificacion: cali,
          fecha: this.CurrentDate.toString().substr(0, 15)
        }).then((res) =>{
          resolve(res)
        }).catch(err => reject(err))
      })
    })

  }

  Calificacion(id : string){

    const valores: number = this.calificar.value
    let x = valores['estrellas']

    this.restauranteService.getRestaurante(id).subscribe( data => {


       let a : number = (parseInt(x) + data.calificacion)
       let y : number = data.aux + 1
       let total = (a/y)

       // Guardar en la base con 2 decimales
       let total2 = total.toFixed(2)
       console.log("total", total);
       let totalF = parseFloat(total2)

       console.log("total firebase", totalF);

       let califica : resta = {
        aux:y,
        calificacion: a,
        promedio : totalF
      }

      this.restauranteService.updateRestaurante(id, califica)
    })

  }

}
