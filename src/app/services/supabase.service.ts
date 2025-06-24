import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

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

  async subirArchivo(file: File, cedula: string): Promise<string | null> {
    const nombreLimpio = file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, "") // elimina caracteres raros como paréntesis o tildes especiales
      .toLowerCase();
  
    const nombreArchivo = `usuarios/${cedula}_${nombreLimpio}`;
  
    const { data, error } = await this.supabase
      .storage
      .from('files')
      .upload(nombreArchivo, file, { upsert: true });
      console.log('Subiendo archivo como:', nombreArchivo);

    if (error) {
      console.error('Error al subir archivo:', error.message);
      return null;
    }
  
    const { publicUrl } = this.supabase
      .storage
      .from('files') // ojo, aquí decías 'archivos' pero tu bucket es 'files'
      .getPublicUrl(nombreArchivo).data;
  
    return publicUrl;
    
  }

  async guardarRector(cedula: string, archivo_url: string) {
    const { error } = await this.supabase
      .from('RectoresSed') // nombre exacto de tu tabla
      .insert({
        cedula,
        archivo_url
      });

    if (error) {
      console.error('Error al guardar en la tabla:', error.message);
    }
  }
}
