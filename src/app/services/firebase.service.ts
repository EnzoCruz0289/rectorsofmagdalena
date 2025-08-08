import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, arrayRemove, collection, doc, docData, getDoc, getDocs, getFirestore, setDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private _firestore = inject(Firestore)
  private path = 'information'
  constructor() { }

    getUserById(id: string): Observable<any> {
      const document = doc(this._firestore, this.path, id);
      return docData(document, { idField: 'id' }) as Observable<any>;
    }
    
    // Guardar formulario principal (por cédula)
    async guardarFormularioPrincipal(data: any) {
      const docRef = doc(this._firestore, `information/${data.ceddocente}`);
      const docSnap = await getDoc(docRef);
    
      if (!docSnap.exists()) {
        await setDoc(docRef, data); // Solo crea si NO existe
      } else {
        console.log("Documento ya existe, no se modifica.");
      }
    }

  // Verificar si la cédula ya existe
  async cedulaExiste(cedula: string): Promise<boolean> {
    const docRef = doc(this._firestore, 'information', cedula);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  // Guardar una incapacidad en subcolección con fecha automática
  async guardarIncapacidad(cedula: string, days: number) {
    const date = new Date().toISOString().split('T')[0];
    const subRef = collection(this._firestore, 'information', cedula, 'incapacidades');
    await addDoc(subRef, { days, date });
  }

  async contarTodasIncapacidades(): Promise<number> {
    const db = getFirestore();
    let total = 0;
  
    try {
      const usuariosSnapshot = await getDocs(collection(db, 'information'));
      
      for (const doc of usuariosSnapshot.docs) {
        const subcoleccionRef = collection(db, 'information', doc.id, 'incapacidades');
        const subDocsSnapshot = await getDocs(subcoleccionRef);
        total += subDocsSnapshot.size;
      }
  
      return total;
  
    } catch (error) {
      console.error('❌ Error al contar incapacidades:', error);
      return 0;
    }
  }


} 