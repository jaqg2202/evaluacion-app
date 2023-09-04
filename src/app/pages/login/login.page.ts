import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { 
  FormGroup, 
  FormControl, 
  Validators, 
  FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 
  login: FormGroup;

  constructor(private router: Router,
    public fb: FormBuilder) {

      this.login = this.fb.group({
        'usuario':new FormControl("",Validators.required),
        'password':new FormControl("",Validators.required)
      })
    
    }

  ngOnInit() {
  }

  async iniciar(){
    var inicio = this.login.value;
    var registrar = localStorage.getItem('usuario');
    if(registrar !== null){
      var login = JSON.parse(registrar);
      if (login.user == inicio.usuario && login.password == inicio.password) {
        this.router.navigate(['principal']);
        console.log(this.login);
      }
    }
    
    



  }
  navegarRegistro(){
    this.router.navigate(['registro'])

  }
  
}
