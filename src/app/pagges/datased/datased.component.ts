import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { FirebaseService } from '../../services/firebase.service';
import Swal from 'sweetalert2'
import { SupabaseService } from '../../services/supabase.service';
import { LoaderService } from '../../services/loader.service';
import { distinctUntilChanged } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-datased',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,CommonModule,FormsModule],
  templateUrl: './datased.component.html',
  styleUrls: ['./datased.component.css']  // ✅ aquí corregido
})
export class DatasedComponent {
  myForm: FormGroup;
  cedula = '';
  archivo!: File;
  urlArchivo1!: File;
  urlArchivo2!: File;
  year = new Date().getFullYear();
  // totalIncapacidades: number = 0;
  @ViewChild('inputArchivo1') inputArchivo1!: ElementRef;
  @ViewChild('inputArchivo2') inputArchivo2!: ElementRef;
  accesoPermitido = false;
  claveIngresada = '';
  errorClave = false;
  step = 1;
  
  constructor(private fb: FormBuilder, private supabase: SupabaseService, private firebase: FirebaseService,
    private loaderService: LoaderService) {
   
    this.myForm = this.fb.group({
      municipio: ['', Validators.required],
      ied: ['', Validators.required],
      namerec: ['', Validators.required],
      cedrec: ['', Validators.required],
      areaed: ['', Validators.required],
      days: ['',Validators.required],
      emailied: ['', Validators.required],
      ceddocente: ['', Validators.required],
      numied: ['', Validators.required],
      numrec: ['', Validators.required],
      observation: ['', Validators.required],
      numsac: ['', Validators.required]
    })

    this.myForm.get('observation')?.valueChanges
  .pipe(distinctUntilChanged())
  .subscribe((valor: string) => {
    setTimeout(() => {
      if (valor?.toLowerCase() === 'prorroga') {
        this.deshabilitarCamposProrroga();
      } else {
        this.habilitarTodosCampos();
      }
    }, 0);
  });

  }

//   async obtenerTotalDesdeFirebase() {
//   this.totalIncapacidades = await this.firebase.contarTodasIncapacidades();
// }
//   ngOnInit() {
//     this.obtenerTotalDesdeFirebase();
//   }


ngOnInit() {
  if (localStorage.getItem('accesoDatased') === 'true') {
    this.accesoPermitido = true;

    // Guardar clave actual
    this.firebase.getPassword().then(clave => {
      localStorage.setItem('claveUsada', clave || '');
    });

    // Escuchar cambios de clave
    this.firebase.escucharClave().subscribe(nuevaClave => {
      const claveGuardada = localStorage.getItem('claveUsada');
      if (nuevaClave && nuevaClave !== claveGuardada) {
        localStorage.removeItem('accesoDatased');
        localStorage.removeItem('claveUsada');
        this.accesoPermitido = false;
        Swal.fire({
          icon: 'info',
          title: 'Contraseña actualizada',
          text: 'La clave de acceso ha cambiado. Por favor vuelve a ingresar.'
        });
      }
    });
  }
}


async verificarClave() {
  const claveCorrecta = await this.firebase.getPassword();

  if (claveCorrecta && this.claveIngresada === claveCorrecta) {
    this.accesoPermitido = true;
    this.errorClave = false;
    localStorage.setItem('accesoDatased', 'true');
  } else {
    this.errorClave = true;
    alert("❌ Clave incorrecta. Inténtalo nuevamente."); // alerta
    this.claveIngresada = '';
  }
}

limpiarInputsArchivo() {
  if (this.inputArchivo1) {
    (this.inputArchivo1.nativeElement as HTMLInputElement).value = '';
  }
  if (this.inputArchivo2) {
    (this.inputArchivo2.nativeElement as HTMLInputElement).value = '';
  }

  this.urlArchivo1 = undefined!;
  this.urlArchivo2 = undefined!;
}

  deshabilitarCamposProrroga() {
    const campos = Object.keys(this.myForm.controls);
    for (const campo of campos) {
      if (campo !== 'ceddocente' && campo !== 'days' && campo !== 'observation') {
        this.myForm.get(campo)?.disable();
        this.myForm.get(campo)?.clearValidators();
        this.myForm.get(campo)?.updateValueAndValidity();
      }
    }
  }
  
  habilitarTodosCampos() {
  const campos = Object.keys(this.myForm.controls);

  for (const campo of campos) {
    const control = this.myForm.get(campo);
    if (!control) continue;

    // Solo habilita si está deshabilitado
    if (control.disabled) {
      control.enable({ emitEvent: false }); // evita nuevo valueChanges
    }

    // Establece validador solo si no lo tiene ya
    control.setValidators(Validators.required);
    control.updateValueAndValidity({ emitEvent: false }); // evita loops
  }
}


  onFileChange(event: any, tipo: string) {
    const archivo = event.target.files[0];

    const maxSize = 5 * 1024 * 1024; // 2MB en bytes

    if (archivo && archivo.size > maxSize) {
      Swal.fire({
        icon: 'warning',
        title: 'Archivo demasiado grande',
        text: 'El archivo debe ser menor a 5 MB. Se recomienda reducir el tamaño de los archivos.',
      });
      event.target.value = ''; // Limpia el input
      return;
    }

    if (tipo === 'incapacidad') {
      this.urlArchivo1 = archivo;
      // event.target.value = '';
    } else if (tipo === 'hojaDeVida') {
      this.urlArchivo2 = archivo;
      // event.target.value = '';
    }
  }

  async enviar() {
    this.loaderService.show();

    const formData = this.myForm.getRawValue(); // ✅ CAMBIADO AQUÍ
    const observation = formData.observation?.toLowerCase();
    const cedula = String(formData.ceddocente).trim();
    const fecha = new Date().toISOString();  // para fecha de subida
    let fechaa = new Date();
      let mes = (fechaa.getMonth() + 1).toString().padStart(2, '0');
      let dia = fechaa.getDate().toString().padStart(2, '0');
      let año = fechaa.getFullYear();
      let hora = fechaa.getHours().toString().padStart(2, '0');
      let min = fechaa.getMinutes().toString().padStart(2, '0');

      formData.fechaReal = new Date(); // si quieres mantenerla
      formData.fechaRegistrocomp = `${dia}/${mes}/${año} ${hora}:${min}`;
      formData.fechaRegistro = new Date(); // esta se usará para filtrar
    // Validar el formulario primero
    if (this.myForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, complete todos los campos.'
      });
      this.myForm.markAllAsTouched();
      this.loaderService.hide();
      return;
    }

    if (observation === 'prorroga') {
      const existe = await this.firebase.cedulaExiste(cedula);
      if (!existe) {
        Swal.fire({
          icon: 'error',
          title: 'No puedes enviar',
          text: 'La cédula no está registrada. No puedes registrar una prórroga.'
        });
        this.loaderService.hide();
        return;
      }
    }    
    
  
    try {
      // 1. Subir archivos
      let urlArchivo1: string ='';
      let urlArchivo2: string ='';
      const identificadorUnico = await this.firebase.incrementarContador();

      if (this.urlArchivo1) {
        urlArchivo1 = await this.supabase.subirArchivo(this.urlArchivo1, cedula, 'incapacidad');
        if (!urlArchivo1) {
          throw new Error('Error al subir el archivo de incapacidad.');
        }
      }
      
      if (this.urlArchivo2) {
        urlArchivo2 = await this.supabase.subirArchivo(this.urlArchivo2, cedula, 'cv');
        if (!urlArchivo2) {
          throw new Error('Error al subir el archivo de hoja de vida.');
        }
      }
  
      // 2. Obtener número de secuencia
      const lista = await this.supabase.obtenerTodasIncapacidadesPorCedula(cedula);
      const numeroSecuencia = lista.length + 1;
  
      // 3. Insertar en la tabla Supabase
      const { error } = await this.supabase.supabase
        .from('IncapacidadesRectores')
        .insert({
          cedula: cedula,
          archivo_1_url: urlArchivo1,
          archivo_2_url: urlArchivo2,
          fecha_incapacidad: formData.fecha_incapacidad || fecha,
          dias_incapacidad: formData.days,
          numero_secuencia: numeroSecuencia
        });
  
      if (error) {
        console.error('❌ Error al guardar en Supabase:', error.message);
        Swal.fire({ icon: 'error', title: 'Error al guardar en Supabase' });
        return;
      }
  
      // 4. Guardar en Firebase (si aplica)
      const yaExiste = await this.firebase.cedulaExiste(cedula);
      if (!yaExiste) {
        await this.firebase.guardarFormularioPrincipal(formData);
      }
  
      await this.firebase.guardarIncapacidad(cedula, formData.days);
  
      Swal.fire({ 
        icon: 'success', 
        title: 'Guardado correctamente',
        html: `<b style="font-size:18px; color:#000">IDENTIFICADOR UNICO:</b> <b style="font-size:22px; color:red">000${identificadorUnico}</b> <br>
        <b style="font-size:18px; color:#000">DOCENTE INCAPACITADO:</b><b style="font-size:22px; color:red">    ${this.myForm.value.ceddocente}</b>`,
        didOpen: async () => {
          await new Promise(resolve => setTimeout(resolve, 300)); 
          const modal = document.querySelector('.swal2-popup') as HTMLElement;
    
          if (modal) {
            html2canvas(modal).then(canvas => {
              const imgData = canvas.toDataURL('image/png');
              const link = document.createElement('a');
              link.href = imgData;
              link.download = 'captura_incapacidad.png';
              link.click();
            });
          }
        }
      });
      this.limpiarInputsArchivo();
      this.myForm.reset();
      // await this.obtenerTotalDesdeFirebase(); // Actualiza el contador sin recargar la página

  
    } catch (e) {
      console.error('Error general:', e);
      Swal.fire({ icon: 'error', title: 'Error general' });
    } finally {
      this.loaderService.hide();
    }
  }

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

}