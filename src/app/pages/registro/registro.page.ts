import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { 
  FormGroup, 
  FormControl, 
  Validators, 
  FormBuilder} from '@angular/forms'
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registro: FormGroup;

  constructor(private router: Router,
    public fb: FormBuilder,
    public alertController: AlertController,
    private loadingCtrl: LoadingController) {

      this.registro = this.fb.group({
        'correo':new FormControl("",Validators.required),
        'usuario':new FormControl("",Validators.required),
        'contrasena':new FormControl("",Validators.required), 
        'confirmarContrasena':new FormControl("",Validators.required)
      })
    
    }

  ngOnInit() {
  }


  async guardar(){
    let registrar = this.registro.value;

    if (this.registro.invalid) {
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
        message: 'Registrado',
        duration: 1000,
      });
  
      loading.present();
      
    }

    let usuario ={
      user: registrar.usuario,
      password: registrar.contrasena,
      email: registrar.correo

    }
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.router.navigate(['login']);
    console.log(this.registro);
    }
  }

