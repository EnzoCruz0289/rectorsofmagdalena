import { Component, OnInit, inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms'
import { FirebaseService } from '../../services/firebase.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-datased',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './datased.component.html',
  styleUrl: './datased.component.css'
})
export class DatasedComponent   {
  firebase = inject(FirebaseService)
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.myForm = this.fb.group({
      municipio:['',Validators.required],
      ied:['',Validators.required],
      namerec:['',Validators.required],
      cedrec:['',Validators.required],
      areaed:['',Validators.required],
      emailied:['',Validators.required],
      emalrec:['',Validators.required],
      numied:['',Validators.required],
      numrec:['',Validators.required],
      observation:['',Validators.required]
    })
  }

  async enviar(){
    try{
      await this.firebase.createInventory(this.myForm.value);
        Swal.fire({
          icon: "success",
          title: "Registro Exitoso",
          text: "Gracias por participar"
        });
    }
    catch (error) {
      console.error('Error al enviar datos:', error);
    }
  }

}