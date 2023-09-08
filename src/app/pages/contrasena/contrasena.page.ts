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
    let registrar = this.newpassword.value;

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
      if (registrar.contrasena != registrar.confirmarContrasena) {
        const alert = await this.alertController.create({
          header: 'ERROR!',
          subHeader: 'Contraseñas no coinciden',
          message: 'Verifique por favor!',
          buttons: ['Aceptar'],
        });
    
        await alert.present();
        return;
      }
      const loading = await this.loadingCtrl.create({
        message: 'Contraseña Restablecida...',
        duration: 2000,
      });
  
      loading.present();
      
    }

    let usuario = localStorage.getItem('usuario');

    if(usuario !== null){
      let f = JSON.parse(usuario);

      let newUsuario ={
        email:f.email,
        user: f.user,
        password: registrar.contrasena

      }

      localStorage.setItem('usuario',JSON.stringify(newUsuario));
      this.router.navigate(['login']);
      localStorage.removeItem('clave');
      console.log(this.newpassword);

    }

  }
  salir(){
    localStorage.removeItem('clave');
   
  }
}
