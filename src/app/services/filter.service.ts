import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterTsService {
  constructor(private firestore: Firestore) {}

  getUserFiltered(filtroname: string): Observable<any[]> {
    const ref = collection(this.firestore, 'information'); // Correcto uso
    const q = query(ref, where('cedrec', '==', filtroname));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }
}
