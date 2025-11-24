import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://pdrrhmmohbxscasotmbq.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkcnJobW1vaGJ4c2Nhc290bWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MTIwNTQsImV4cCI6MjA2NjI4ODA1NH0.xA8KspFi1FvlmPZy8DDvqdDggz5X_DCNWW_8UxhMB-M',
      {
        auth: {
          persistSession: false,         // <- evita guardar sesión local
          autoRefreshToken: false        // <- evita que use LockManager
        }
      }
    );
    
  }

  private limpiarNombreArchivo(nombre: string): string {
    return nombre
      .normalize('NFD')                   // Elimina tildes
      .replace(/[\u0300-\u036f]/g, '')    // Borra diacríticos
      .replace(/\s+/g, '_')               // Espacios por guiones bajos
      .replace(/[^\w.-]/g, '');           // Elimina cualquier carácter no válido
  }

  // async subirArchivo(file: File, cedula: string, tipo: 'cv' | 'incapacidad'): Promise<string | null> {
  //   try {
  //     const nombreLimpio = this.limpiarNombreArchivo(file.name);
  //     const timestampNow = Date.now();
  //     const nombreArchivo = `${cedula}/${timestampNow}-${nombreLimpio}`;
  
  //     // 1️⃣ Subir el archivo con upsert
  //     const { data, error } = await this.supabase.storage
  //       .from('files')
  //       .upload(nombreArchivo, file, { upsert: true });
  
  //     // 2️⃣ Verificar errores de subida
  //     if (error || !data?.path) {
  //       console.error('❌ Error al subir archivo:', error?.message || 'Subida incompleta');
  //       alert('La carga del archivo falló. Por favor, inténtalo de nuevo.');
  //       return null; // Detiene la ejecución en el componente
  //     }
  
  //     // 3️⃣ Obtener URL pública
  //     const { data: publicUrlData } = this.supabase
  //       .storage
  //       .from('files')
  //       .getPublicUrl(nombreArchivo);
  
  //     const publicUrl = publicUrlData?.publicUrl;
  //     if (!publicUrl) {
  //       console.error('❌ Error al generar URL pública.');
  //       alert('Error al generar el enlace del archivo. Inténtalo de nuevo.');
  //       return null;
  //     }
  
  //     // 4️⃣ Confirmar que el archivo se pueda listar (verificación final opcional)
  //     const carpeta = cedula;
  //     const { data: lista } = await this.supabase.storage.from('files').list(carpeta);
  //     const existe = lista?.some(f => f.name === `${timestampNow}-${nombreLimpio}`);
  
  //     if (!existe) {
  //       console.error('⚠️ El archivo no se encuentra en el bucket tras subirlo.');
  //       alert('Hubo un problema con la carga del archivo. Inténtalo nuevamente.');
  //       return null;
  //     }
  
  //     return publicUrl; // ✅ Todo correcto
  
  //   } catch (err) {
  //     console.error('Error inesperado en subirArchivo:', err);
  //     alert('Ocurrió un error al subir el archivo. Por favor, revisa tu conexión e inténtalo de nuevo.');
  //     return null;
  //   }
  // }

  async subirArchivo(
    file: File,
    cedula: string,
    tipo: 'cv' | 'incapacidad',
    onProgress?: (porcentaje: number) => void
  ): Promise<string> {
    const nombreLimpio = this.limpiarNombreArchivo(file.name);
    const timestampNow = Date.now();
    const nombreArchivo = `${cedula}/${timestampNow}-${nombreLimpio}`;
  
    // 🔹 Crear un stream de lectura para calcular progreso
    const total = file.size;
    let cargado = 0;
  
    const reader = file.stream().getReader();
    const chunks: Uint8Array[] = [];
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      cargado += value.length;
      if (onProgress) {
        const porcentaje = Math.round((cargado / total) * 100);
        onProgress(porcentaje); // 🔹 llama al callback
      }
    }
  
    const fileBuffer = new Blob(chunks, { type: file.type });
  
    // 🔹 Subir el archivo
    const { data, error } = await this.supabase.storage
  .from('files')
  .upload(nombreArchivo, fileBuffer, {
    cacheControl: '3600',
    upsert: true, // ✅ CORREGIDO
  });
  
    if (error) throw new Error(`Error al subir archivo: ${error.message}`);
  
    const { publicUrl } = this.supabase
      .storage
      .from('files')
      .getPublicUrl(nombreArchivo).data;
  
    if (!publicUrl) throw new Error('No se pudo obtener la URL pública');
  
    return publicUrl;
  }


  async guardarRector(cedula: string, incapacidadId: string, hojaVidaUrl: string, incapacidadUrl: string) {
    const { error } = await this.supabase
      .from('IncapacidadesRectores')
      .insert({
        cedula: String(cedula).trim(),
        incapacidadId: incapacidadId,
        archivo_1_url: hojaVidaUrl,
        archivo_2_url: incapacidadUrl,
        numero_secuencia: 1,
        fecha_incapacidad: new Date().toISOString(),
            });
  
    if (error) {
      console.error('Error al guardar en Supabase:', error.message);
    } else {
      console.log('✅ Datos guardados correctamente');
    }
  }

  async obtenerArchivosPorCedula(cedula: string): Promise<{ cv: string | null, incapacidad: string | null }> {
    const { data, error } = await this.supabase
      .from('IncapacidadesRectores')
    .select('archivo_cv_url, archivo_incapacidad_url')
      .eq('cedula', cedula)
      .order('id', { ascending: false })  // 👈 ordena por el último insertado
      .limit(1)
      .maybeSingle(); // 👈 devuelve null si no encuentra nada, pero no lanza error
  
    if (error || !data) {
      // console.error('No se encontraron archivos:', error);
      return { cv: null, incapacidad: null };
    }
  
    return {
      cv: data.archivo_cv_url,
      incapacidad: data.archivo_incapacidad_url
    };
  }

  async existeCedula(cedula: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('IncapacidadesRectores')
      .select('cedula')
      .eq('cedula', cedula)
      .maybeSingle();
  
    return !!data;
  }

  async obtenerTodasIncapacidadesPorCedula(cedula: string) {
    const { data, error } = await this.supabase
      .from('IncapacidadesRectores')
      .select('*')
      .eq('cedula', cedula);
  
    if (error) {
      // console.error('Error al obtener incapacidades:', error.message);
      return [];
    }
  
    return data;
  }
  
}  
