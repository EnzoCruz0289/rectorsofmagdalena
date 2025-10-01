import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  firebaseservice = inject (LoginService)
  router = inject(Router)
   formLog = new FormGroup({
     email : new FormControl('',Validators.required),
     password : new FormControl('',Validators.required)
   })

   onSubmit(){
    this.firebaseservice.login(this.formLog.value)
    .then(response=>{
      Swal.fire({
        title: "Ingreso Exitoso",
        text: "Bienvenido",
        icon: "success"
      })
      this.router.navigate(["sedmag/consulta"],)
      console.log(response)
    })
    .catch(error=>Swal.fire({
      title: "Ingreso Invalido",
      text: "Usuario o contraseña incorrecta",
      icon: "error"
    }))
    
  }

}
