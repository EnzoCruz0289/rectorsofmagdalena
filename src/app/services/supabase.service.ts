import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

  async subirArchivo(file: File, cedula: string, tipo: 'cv' | 'incapacidad'): Promise<string | null> {
    const nombreLimpio = this.limpiarNombreArchivo(file.name);
    const nombreArchivo = `usuarios/${cedula}_${tipo}_${nombreLimpio}`;

    
    const { data, error } = await this.supabase
      .storage
      .from('files')
      .upload(nombreArchivo, file, { upsert: true });
  
    if (error) {
      console.error('Error al subir archivo:', error.message);
      return null;
    }
  
    const { publicUrl } = this.supabase
      .storage
      .from('files')
      .getPublicUrl(nombreArchivo).data;
  
    return publicUrl;
  }
  

  async guardarRector(cedula: string, hojaVidaUrl: string, incapacidadUrl: string) {
    const { error } = await this.supabase
      .from('IncapacidadesRectores')
      .insert({
        cedula : String(cedula).trim(),
        archivo_cv_url: hojaVidaUrl,
        archivo_incapacidad_url: incapacidadUrl
      });
  
    if (error) {
      console.error('Error al guardar en la tabla:', error.message);
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
      console.error('No se encontraron archivos:', error);
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
      console.error('Error al obtener incapacidades:', error.message);
      return [];
    }
  
    return data;
  }
  
}  
