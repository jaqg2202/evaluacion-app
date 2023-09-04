import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { 
  FormGroup, 
  FormControl, 
  Validators, 
  FormBuilder} from '@angular/forms'
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  mdl_modal: string = 'open-modal'
  recuperar: FormGroup;
  

  constructor(private router:Router,
    public fb: FormBuilder) { 

      this.recuperar = this.fb.group({
       'correo':new FormControl("",Validators.required),

      })
      


  }

  ngOnInit() {
  }

  formatear(){
    var email = this.recuperar.value;
    var verificar = localStorage.getItem('usuario');
    if(verificar !== null){
      var emailverificar = JSON.parse(verificar);
      if (emailverificar.email == email.correo) {
        
        this.router.navigate(['contrasena']);
        }
        
      }
    }
  }

