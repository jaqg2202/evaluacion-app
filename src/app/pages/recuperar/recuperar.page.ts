import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { 
  FormGroup, 
  FormControl, 
  Validators, 
  FormBuilder} from '@angular/forms'
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  mdl_modal: string = 'open-modal'
  recuperar: FormGroup;
  

  constructor(private router:Router,
    public fb: FormBuilder,
    public alertController:AlertController) { 

      this.recuperar = this.fb.group({
       'correo':new FormControl("",Validators.required),

      })
      


  }

  ngOnInit() {
  }

  async formatear(){
    let email = this.recuperar.value;
    let verificar = localStorage.getItem('usuario');
    if(verificar !== null){
      let emailverificar = JSON.parse(verificar);
      if (emailverificar.email == email.correo) {
        localStorage.setItem('clave', 'true')
        this.router.navigate(['contrasena'])
        }else{
          const alert = await this.alertController.create({
            header: 'ERROR!',
            subHeader: 'Correo no registrado',
            message: 'Verifique por favor!',
            buttons: ['Aceptar'],
          });
      
          await alert.present();
          return;
        }
        
      }
    }
  }

