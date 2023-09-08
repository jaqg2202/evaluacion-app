import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  parametro = localStorage.getItem('nombre');

  constructor() { 
    
   
  }

  

  ngOnInit() { console.log(this.parametro);
  }

  cerrarSesion(){
    localStorage.removeItem('Ingresado');
    localStorage.removeItem('nombre');
  }
}
