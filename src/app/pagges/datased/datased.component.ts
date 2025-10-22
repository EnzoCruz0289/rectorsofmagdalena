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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-datased',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,CommonModule,FormsModule,MatDatepickerModule,MatFormFieldModule,MatNativeDateModule  ],
  templateUrl: './datased.component.html',
  styleUrls: ['./datased.component.css']  
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
  subiendoArchivo1 = false;
  progresoArchivo1 = 0;
  subiendoArchivo2 = false;
  progresoArchivo2 = 0;
  
  constructor(private fb: FormBuilder, private supabase: SupabaseService, private firebase: FirebaseService,
    private loaderService: LoaderService) {
   
    this.myForm = this.fb.group({
      municipio: ['', Validators.required],
      ied: ['', Validators.required],
      nombreDocente: ['', Validators.required],
      tipoVinculacion: ['', Validators.required],
      areaEducativa: ['', Validators.required],
      days: ['',Validators.required],
      numeroIncapacidad: ['', Validators.required],
      cedulaDocente: ['', Validators.required],
      cargo: ['', Validators.required],
      tipoIncapacidad: ['', Validators.required],
      tipoTramiteDocente: ['', Validators.required],
      numsac: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      tipoTramiteRemplazo: ['',Validators.required],
      nombreRemplazo: ['', Validators.required],
      cedulaRemplazo: ['', Validators.required],
      profesionRemplazo: ['',Validators.required],
      universidadRemplazo: ['', Validators.required]
    })

  this.myForm.get('tipoTramiteDocente')?.valueChanges
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

  this.myForm.get('tipoTramiteRemplazo')?.valueChanges
  .pipe(distinctUntilChanged())
  .subscribe((valor: string) => {
    setTimeout(() => {
      if (valor?.toLowerCase() === 'prorroga') {
        this.deshabilitarCamposProrrogaRemplazo();
      } else {
        this.habilitarTodosCamposRemplazo();
      }
    }, 0);
  });

  }
  

  deshabilitarCamposProrroga() {
    const docente = [ 
      'municipio',
      'ied',
      'nombreDocente',
      'tipoVinculacion',
      'areaEducativa',
      'days',
      'numeroIncapacidad',
      'cedulaDocente',
      'cargo',
      'tipoIncapacidad',
      'numsac',
    ]
    for (const campo of docente) {
      if (campo !== 'cedulaDocente' && campo !== 'days' && campo !== 'fechaInicio' && campo !== 'fechaFin' && campo !== 'tipoTramiteDocente' && campo !== 'tipoTramiteRemplazo' && campo !== 'nombreRemplazo' && campo !== 'cedulaRemplazo' && campo !== 'profesionRemplazo' && campo !== 'universidadRemplazo' ) {
        this.myForm.get(campo)?.disable();
        this.myForm.get(campo)?.clearValidators();
        this.myForm.get(campo)?.updateValueAndValidity();
      }
    }
  }

  habilitarTodosCampos() {
    const campos = [
        'municipio',
        'ied',
        'nombreDocente',
        'tipoVinculacion',
        'areaEducativa',
        'days',
        'numeroIncapacidad',
        'cedulaDocente',
        'cargo',
        'tipoIncapacidad',
        'tipoTramiteDocente',
        'numsac',
        'fechaInicio',
        'fechaFin',
    ];
  
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

  deshabilitarCamposProrrogaRemplazo() {
    const camposRemplazo = [
      'nombreRemplazo',
      'cedulaRemplazo',
      'profesionRemplazo',
      'universidadRemplazo'
    ];
      for (const campo of camposRemplazo) {
      if (campo !== 'tipoTramiteRemplazo' && campo !== 'tipoTramiteDocente') {
        this.myForm.get(campo)?.disable();
        this.myForm.get(campo)?.clearValidators();
        this.myForm.get(campo)?.updateValueAndValidity();
      }
    }
  }

  habilitarTodosCamposRemplazo() {
    const camposRemplazo = [
      'tipoTramiteRemplazo',
      'nombreRemplazo',
      'cedulaRemplazo',
      'profesionRemplazo',
      'universidadRemplazo'
    ];

    for (const campo of camposRemplazo) {
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

  ngOnInit() {
    const accesoPrevio = localStorage.getItem('accesoDatased') === 'true';
    const claveGuardada = localStorage.getItem('claveUsada');
  
    this.firebase.getPassword().then(claveActual => {
      if (accesoPrevio && claveGuardada === claveActual) {
        this.accesoPermitido = true;
      } else {
        // 🔒 Si cambió la clave o nunca ha entrado
        this.accesoPermitido = false;
        localStorage.removeItem('accesoDatased');
        localStorage.removeItem('claveUsada');
      }
    });
  
    // Escuchar cambios en tiempo real
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

  async verificarClave() {
    const claveCorrecta = await this.firebase.getPassword();
  
    if (claveCorrecta && this.claveIngresada === claveCorrecta) {
      this.accesoPermitido = true;
      this.errorClave = false;
      localStorage.setItem('accesoDatased', 'true');
      localStorage.setItem('claveUsada', claveCorrecta); // 👈 guardamos la actual
    } else {
      this.errorClave = true;
      alert("❌ Clave incorrecta. Inténtalo nuevamente.");
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

    const formData = this.myForm.getRawValue();
    const observation = formData.tipoTramiteDocente?.toLowerCase();
    const cedula = String(formData.cedulaDocente).trim();

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
      
      this.loaderService.show();

      const formData = this.myForm.getRawValue();
      const cedula = String(formData.cedulaDocente).trim();
      const ahora = new Date();
      const dia = ahora.getDate().toString().padStart(2, '0');
      const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
      const año = ahora.getFullYear();
      const hora = ahora.getHours().toString().padStart(2, '0');
      const min = ahora.getMinutes().toString().padStart(2, '0');

      formData.fechaReal = ahora;
      formData.fechaRegistro = ahora;
      formData.fechaRegistrocomp = `${dia}/${mes}/${año} ${hora}:${min}`;
      // ✅ FIN DEL BLOQUE DE FECHAS

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
    
      // 🔹 Genera un identificador único para este envío
      const identificadorUnico = await this.firebase.incrementarContador();
    
      // 🔹 Variables donde guardaremos las URLs subidas
      let urlArchivo1: string | null = null;
      let urlArchivo2: string | null = null;
    
      // -------------------------
      // SUBIDA SEGURA ARCHIVO 1
      // -------------------------
      if (this.urlArchivo1) {
        try {
          this.subiendoArchivo1 = true;
      
          // Llamas al servicio que sube el archivo
          urlArchivo1 = await this.supabase.subirArchivo(
            this.urlArchivo1,
            cedula,
            'incapacidad',
            (p) => { this.progresoArchivo1 = p; }
          );
      
        } catch (err) {
          this.subiendoArchivo1 = false;
          this.loaderService.hide();
          Swal.fire({
            icon: 'error',
            title: 'Error al subir archivo de incapacidad',
            text: 'No se pudo completar la subida. Verifique su conexión o intente nuevamente.'
          });
          return; // 🚫 Detiene todo el proceso
        } finally {
          this.subiendoArchivo1 = false;
        }
      }
      
      // -------------------------
      // SUBIDA SEGURA ARCHIVO 2
      // -------------------------
      if (this.urlArchivo2) {
        try {
          this.subiendoArchivo2 = true;
      
          urlArchivo2 = await this.supabase.subirArchivo(
            this.urlArchivo2,
            cedula,
            'cv',
            (p) => { this.progresoArchivo2 = p; }
          );
      
        } catch (err) {
          this.subiendoArchivo2 = false;
          this.loaderService.hide();
          Swal.fire({
            icon: 'error',
            title: 'Error al subir archivo de hoja de vida',
            text: 'No se pudo completar la subida. Verifique su conexión o intente nuevamente.'
          });
          return; // 🚫 Detiene el envío del formulario
        } finally {
          this.subiendoArchivo2 = false;
        }
      }
    
      // ✅ Si falta el archivo de incapacidad, detener el proceso
      if (!urlArchivo1) {
        this.loaderService.hide();
        Swal.fire({
          icon: 'error',
          title: 'Archivo faltante',
          text: 'Debe subir el archivo de incapacidad antes de enviar.'
        });
        return;
      }
    
      // -----------------------------------
      //  Una vez subidos correctamente
      // -----------------------------------
      const lista = await this.supabase.obtenerTodasIncapacidadesPorCedula(cedula);
      const numeroSecuencia = lista.length + 1;
    
      const { error } = await this.supabase.supabase
        .from('IncapacidadesRectores')
        .insert({
          cedula,
          incapacidadId: identificadorUnico, // 👈 usa el nombre correcto según tu tabla
          archivo_1_url: urlArchivo1,
          archivo_2_url: urlArchivo2,
          fecha_incapacidad: new Date().toISOString(),
          dias_incapacidad: formData.days,
          numero_secuencia: numeroSecuencia
        });
    
      if (error) {
        throw new Error('Error al guardar en Supabase: ' + error.message);
      }
    
      // 🔹 Guardar en Firebase si aplica
      const yaExiste = await this.firebase.cedulaExiste(cedula);
      if (!yaExiste) {
        await this.firebase.guardarFormularioPrincipal(formData);
      }
    
      await this.firebase.guardarIncapacidad(
        cedula,
        formData.days,
        this.myForm.value.nombreRemplazo || null,
        this.myForm.value.fechaInicio || null,
        this.myForm.value.fechaFin || null,
        this.myForm.value.cedulaRemplazo || null,
        this.myForm.value.tipoTramiteRemplazo || 'primera vez',
        identificadorUnico
      );
    
      Swal.fire({
        icon: 'success',
        title: 'Guardado correctamente',
        html: `
          <b style="font-size:18px; color:#000">IDENTIFICADOR ÚNICO:</b> 
          <b style="font-size:22px; color:red">000${identificadorUnico}</b><br>
          <b style="font-size:18px; color:#000">DOCENTE INCAPACITADO:</b>
          <b style="font-size:22px; color:red">${this.myForm.value.cedulaDocente}</b>
        `,
        didOpen: async () => {
          // Esperar un poquito para que el modal se renderice correctamente
          await new Promise(resolve => setTimeout(resolve, 300));
      
          const modal = document.querySelector('.swal2-popup') as HTMLElement;
          if (modal) {
            html2canvas(modal).then(canvas => {
              const imgData = canvas.toDataURL('image/png');
              const link = document.createElement('a');
              link.href = imgData;
              link.download = `soporte_incapacidad_${this.myForm.value.cedulaDocente}.png`;
              link.click();
            });
          }
        }
      });
    
      this.limpiarInputsArchivo();
      this.myForm.reset();
    
    } catch (error) {
      console.error('Error general:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error general',
        text: String("Compruebe su conexion a internet")
      });
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