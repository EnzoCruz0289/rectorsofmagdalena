import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterTsService {
  constructor(private firestore: Firestore) {}

  getUserFiltered(filtroname: string): Observable<any[]> {
    const ref = collection(this.firestore, 'information'); 
    const q = query(ref, where('ceddocente', '==', Number(filtroname)));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  getFechFiltered(startDate: Date, endDate: Date): Observable<any[]> {
    const ref = collection(this.firestore, 'information'); 
    const filteredQuery = query(ref, 
        where('fechaReal', '>=', startDate),
        where('fechaReal', '<=', endDate)
      );
      return collectionData(filteredQuery, { idField: 'id' }) as Observable<any[]>;
  }
}
