import { Component, OnInit, inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms'
import { FirebaseService } from '../../services/firebase.service';
import Swal from 'sweetalert2'
import { SupabaseService } from '../../services/supabase.service';



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
  cedula = '';
  archivo!: File;
  incapacidadArchivo!: File;
  hojaDeVidaArchivo!: File;

  constructor(private fb: FormBuilder, private supabase: SupabaseService) {

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

  async enviar() {
    try {
      const formData = this.myForm.value;
      const cedula = (this.myForm.get('cedrec')?.value ?? '') as string;
  
      // 1. Guardar en Firebase
      await this.firebase.createInventory(formData);
  
      // 2. Subir archivo a Supabase
      let archivoUrl: string | null = null;
      if (this.archivo && cedula) {
        archivoUrl = await this.supabase.subirArchivo(this.archivo, cedula);
      }
  
      // 3. Guardar cedula + URL en Supabase
      if (archivoUrl) {
        await this.supabase.guardarRector(cedula, archivoUrl);
      }

      if (this.incapacidadArchivo && cedula) {
        const incapacidadUrl = await this.supabase.subirArchivo(this.incapacidadArchivo, `${cedula}_incapacidad`);
        // Guardar incapacidadUrl si es necesario
      }
      
      if (this.hojaDeVidaArchivo && cedula) {
        const hojaVidaUrl = await this.supabase.subirArchivo(this.hojaDeVidaArchivo, `${cedula}_hojadevida`);
        if (hojaVidaUrl){
        await this.supabase.guardarRector(cedula, hojaVidaUrl);
        }
      }
  
      // 4. Confirmación
      Swal.fire({
        icon: "success",
        title: "Registro Exitoso",
        text: "Gracias por participar"
      });
  
      this.myForm.reset();
      this.archivo = undefined!;
    } catch (error) {
      console.error('Error al enviar:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al enviar los datos"
      });
    }
  }

  onFileChange(event: any, tipo: string) {
  const archivo = event.target.files[0];

  if (tipo === 'incapacidad') {
    this.incapacidadArchivo = archivo;
  } else if (tipo === 'hojaDeVida') {
    this.hojaDeVidaArchivo = archivo;
  }
}

  async enviarFormulario(event: Event) {
    event.preventDefault();

    if (!this.archivo || !this.cedula) {
      alert('Falta la cédula o archivo.');
      return;
    }

    const archivoUrl = await this.supabase.subirArchivo(this.archivo, this.cedula);

    if (archivoUrl) {
      await this.supabase.guardarRector(this.cedula, archivoUrl);
      alert('Rector guardado con éxito.');
    } else {
      alert('Error al subir archivo.');
    }
  }


}