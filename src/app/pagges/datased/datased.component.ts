import { Component, OnInit, inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms'
import { FirebaseService } from '../../services/firebase.service';
import Swal from 'sweetalert2'
import { SupabaseService } from '../../services/supabase.service';
import { LoaderService } from '../../services/loader.service';



@Component({
  selector: 'app-datased',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './datased.component.html',
  styleUrl: './datased.component.css'
})
export class DatasedComponent   {
  myForm: FormGroup;
  cedula = '';
  archivo!: File;
  incapacidadArchivo!: File;
  hojaDeVidaArchivo!: File;
  year = new Date().getFullYear();

  constructor(private fb: FormBuilder, private supabase: SupabaseService,private firebase: FirebaseService,
    private loaderService: LoaderService) {

    this.myForm = this.fb.group({
      municipio:['',Validators.required],
      ied:['',Validators.required],
      namerec:['',Validators.required],
      cedrec:['',Validators.required],
      areaed:['',Validators.required],
      emailied:['',Validators.required],
      ceddocente:['',Validators.required],
      numied:['',Validators.required],
      numrec:['',Validators.required],
      observation:['',Validators.required]
    })
  }


  onFileChange(event: any, tipo: string) {
    const archivo = event.target.files[0];
  
    if (tipo === 'incapacidad') {
      this.incapacidadArchivo = archivo;
    } else if (tipo === 'hojaDeVida') {
      this.hojaDeVidaArchivo = archivo;
    }
  }

  async enviar() {
    this.loaderService.show();     // 👈 enciendo el spinner

    try {
      const formData = this.myForm.value;
      const cedula: string = this.myForm.get('ceddocente')?.value ?? '';
  
      // 🔍 1. Verificar si la cédula ya existe en Supabase
      const existe = await this.supabase.existeCedula(cedula);
  
      if (this.myForm.invalid) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor llena todos los campos antes de continuar."
        });
        return;
      }

      if (existe) {
        Swal.fire({
          icon: "warning",
          title: "Cédula ya registrada",
          text: "Esta cédula ya fue registrada anteriormente."
        });
        return; // 🚫 No sigue con el proceso
      }
  
      // ✅ 2. Guardar en Firebase (solo si la cédula no existe)
      await this.firebase.createInventory(formData);
  
      let hojaVidaUrl = '';
      let incapacidadUrl = '';
  
      // 3. Subir hoja de vida
      if (this.hojaDeVidaArchivo && cedula) {
        hojaVidaUrl = await this.supabase.subirArchivo(this.hojaDeVidaArchivo, cedula, 'cv') || '';
      }
  
      // 4. Subir incapacidad
      if (this.incapacidadArchivo && cedula) {
        incapacidadUrl = await this.supabase.subirArchivo(this.incapacidadArchivo, cedula, 'incapacidad') || '';
      }
  
      // 5. Guardar en Supabase solo si ambas URLs están
      if (hojaVidaUrl || incapacidadUrl) {
        await this.supabase.guardarRector(cedula, hojaVidaUrl, incapacidadUrl);
      }
  
      Swal.fire({
        icon: "success",
        title: "Registro Exitoso",
        text: "Gracias"
      });
  
      this.myForm.reset();
      this.incapacidadArchivo = undefined!;
      this.hojaDeVidaArchivo = undefined!;
    } catch (error) {
      // console.error('Error al enviar:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al enviar los datos"
      });
    } finally{
      this.loaderService.hide();  // 👈 apago el spinner siempre al final
    }
  }


}