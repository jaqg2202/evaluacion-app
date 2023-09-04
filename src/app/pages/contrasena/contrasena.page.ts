import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { 
  FormGroup, 
  FormControl, 
  Validators, 
  FormBuilder} from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  newpassword: FormGroup;

  constructor(private router:Router,
    public fb: FormBuilder,
    public alertController: AlertController,
    public loadingCtrl: LoadingController) {


    this.newpassword = this.fb.group({

      'contrasena':new FormControl("",Validators.required),
      'confirmarContrasena':new FormControl("",Validators.required)
     })

   }

  ngOnInit() {
  }

  async newpass(){
    var registrar = this.newpassword.value;

    if (this.newpassword.invalid) {
      const alert = await this.alertController.create({
        header: 'ERROR!',
        subHeader: 'Datos incompletos',
        message: 'Para avanzar debe llenar todos los campos.',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
      return;
    }else{
      const loading = await this.loadingCtrl.create({
        message: 'Registrando...',
        duration: 2000,
      });
  
      loading.present();
      
    }

    var usuario = localStorage.getItem('usuario');

    if(usuario !== null){
      var f = JSON.parse(usuario);

      var newUsuario ={
        email:f.email,
        user: f.user,
        password: registrar.contrasena

      }

      localStorage.setItem('usuario',JSON.stringify(newUsuario));
      this.router.navigate(['login']);
      console.log(this.newpassword);

    }

  }
}
