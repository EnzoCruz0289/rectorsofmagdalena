import { Injectable, inject } from '@angular/core';
import { runTransaction, Firestore, addDoc, arrayRemove, collection, doc, docData, getDoc, getDocs, getFirestore, setDoc, updateDoc, onSnapshot} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private _firestore = inject(Firestore)
  private path = 'information'
  private path1 = 'claves'
  constructor() { }

    getUserById(id: string): Observable<any> {
      const document = doc(this._firestore, this.path, id);
      return docData(document, { idField: 'id' }) as Observable<any>;
    }
    
    async savepassword (password:any){
      const documentRef = doc(this._firestore, 'claves/clave-acceso');

      try{
        await setDoc(documentRef, { clave: password });
        console.log('Clave guardada correctamente');
      }
      catch(error){
        console.error('Error guardando clave:', error);
      }

    }


    async getPassword(): Promise<string | null> {
      const documentRef = doc(this._firestore, 'claves/clave-acceso');
      const docSnap = await getDoc(documentRef);
    
      if (docSnap.exists()) {
        return docSnap.data()?.['clave'] || null;
      }
      return null;
    }

    escucharClave(): Observable<string | null> {
      return new Observable(observer => {
        const documentRef = doc(this._firestore, 'claves/clave-acceso');
        const unsubscribe = onSnapshot(documentRef, docSnap => {
          if (docSnap.exists()) {
            observer.next(docSnap.data()['clave'] as string);
          } else {
            observer.next(null);
          }
        });
        return () => unsubscribe();
      });
    }
  

    // Guardar formulario principal (por cédula)
    async guardarFormularioPrincipal(data: any) {
      const docRef = doc(this._firestore, `information/${data.cedulaDocente}`);
      const docSnap = await getDoc(docRef);
      const { days, nombreRemplazo, fechaInicio, fechaFin, cedulaRemplazo, ...dataGeneral } = data;

      if (!docSnap.exists()) {
        await setDoc(docRef, dataGeneral); 
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
  async guardarIncapacidad(cedula: string, days: number, nombreRemplazo:string, fechaInicio:string, fechaFin:string, cedulaRemplazo:number) {
    const date = new Date().toISOString().replace('T', ' ');
    const subRef = collection(this._firestore, 'information', cedula, 'incapacidades');
    await addDoc(subRef, { 
      days, 
      date, 
      nombreRemplazo: nombreRemplazo ?? null,
      fechaInicio: fechaInicio ?? null,  
      fechaFin: fechaFin ?? null,  
      cedulaRemplazo: cedulaRemplazo ?? null
 });
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
      // console.error('❌ Error al contar incapacidades:', error);
      return 0;
    }
  }

  async incrementarContador(): Promise<number> {
    const counterDocRef = doc(this._firestore, 'counters', 'incapacidadesCount');

    const nuevoValor = await runTransaction(this._firestore, async (transaction) => {
      const docSnap = await transaction.get(counterDocRef);

      let currentCount = 0;
      if (docSnap.exists()) {
        currentCount = docSnap.data()['total'] || 0;
      } else {
        transaction.set(counterDocRef, { total: 0 });
      }

      const nextCount = currentCount + 1;
      transaction.update(counterDocRef, { total: nextCount });

      return nextCount;
    });

    return nuevoValor;
  }

  async obtenerIncapacidadesPorCedula(cedula: string | number): Promise<{ incapacidades: any[], totalDias: number }> {
    
    const docRef = doc(this._firestore, `informacion/${cedula}`);
    const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return { incapacidades: [], totalDias: 0 };

  const docenteData = docSnap.data(); // 👈 aquí está nombre, correo, etc.
  const colRef = collection(this._firestore, `informacion/${cedula}/incapacidades`);

    const subRef = collection(
      this._firestore,
      'information',
      String(cedula), // 👈 forzamos string
      'incapacidades'
    );
    
    const snap = await getDocs(subRef);
  
    const incapacidades =  snap.docs.map(doc => ({
      fecha_incapacidad: doc.data()['fechaInicio'],
      dias_incapacidad: doc.data()['days'],
       tipo_docente: docenteData['tipoTramiteRemplazo'],   // 👈 lo agregas a cada incapacidad
       nombre_docente: docenteData['nombreRemplazo'],   // 👈 puedes meter más
      fechaInicio: docenteData['fechaInicio'],
      fechaFin: docenteData['fechaFin'],
      cedulaRemplazo: docenteData['cedulaRemplazo'],
    }));

    let totalDias = 0;
    
    for(let incapacidad of incapacidades){
        totalDias += incapacidad.dias_incapacidad;

      }
      
  return { incapacidades, totalDias };
    }


} 