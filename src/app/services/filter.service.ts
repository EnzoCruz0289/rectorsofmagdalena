import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterTsService {
  constructor(private firestore: Firestore) {}

  getUserFiltered(filtroname: string): Observable<any[]> {
    const ref = collection(this.firestore, 'information'); 
    const q = query(ref, where('cedulaDocente', '==', Number(filtroname)));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  async getFechFiltered(startDate: Date, endDate: Date): Promise<any[]> {
    const ref = collection(this.firestore, 'information');
    const docsSnap = await getDocs(ref);
  
    const results: any[] = [];
  
    for (const doc of docsSnap.docs) {
      const data = doc.data();
      const docId = doc.id;
  
      const subRef = collection(this.firestore, `information/${docId}/incapacidades`);
      const subSnap = await getDocs(subRef);
  
      if (!subSnap.empty) {
        // Ordenar por fecha DESC
        const sorted = subSnap.docs
  .map(s => s.data())
  .sort(
    (a: any, b: any) =>
      new Date(b['date']).getTime() - new Date(a['date']).getTime()
  );
  const ultimaFecha = new Date(sorted[0]['date']);
  
        // validar rango
        if (ultimaFecha >= startDate && ultimaFecha <= endDate) {
          results.push({
            id: docId,
            ...data,
            fechaMasReciente: ultimaFecha
          });
        }
      }
    }
  
    return results;
  }
}
