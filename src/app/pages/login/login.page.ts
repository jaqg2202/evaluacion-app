import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { 
  FormGroup, 
  FormControl, 
  Validators, 
  FormBuilder} from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 
  login: FormGroup;

  constructor(private router: Router,
    public fb: FormBuilder,
    public alertController:AlertController) {

      this.login = this.fb.group({
        'usuario':new FormControl("",Validators.required),
        'password':new FormControl("",Validators.required)
      })
    
    }

  ngOnInit() {
  }

  async iniciar(){
    let inicio = this.login.value;
    let registrar = localStorage.getItem('usuario');
    if(registrar !== null){
      let login = JSON.parse(registrar);
      if (login.user == inicio.usuario && login.password == inicio.password) {

        this.router.navigate(['principal']);
        localStorage.setItem('Ingresado', 'true');
        localStorage.setItem('nombre',login.user);
        
      }else{
        const alert = await this.alertController.create({
          header: 'ERROR!',
          subHeader: 'Credenciales Invalidadas',
          message: 'Verifique por favor!.',
          buttons: ['Aceptar'],
        });
    
        await alert.present();
      }

    }else{
      const alert = await this.alertController.create({
        header: 'ERROR!',
        subHeader: 'Credenciales Invalidadas',
        message: 'Verifique por favor!.',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
      return;
    }
    
    



  }
  navegarRegistro(){
    this.router.navigate(['registro'])

  }
  toRecuperar(){
    this.router.navigate(['recuperar'])
  }
}
