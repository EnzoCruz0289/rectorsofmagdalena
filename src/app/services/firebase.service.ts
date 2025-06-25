import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, arrayRemove, collection, doc, docData, getDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private _firestore = inject(Firestore)
  private path = 'information'
  private _collection = collection(this._firestore,this.path)
  constructor() { }
  
  async createInventory(item:any){
    return await addDoc(this._collection,item)
    }

    getUserById(id: string): Observable<any> {
      const document = doc(this._firestore, this.path, id);
      return docData(document, { idField: 'id' }) as Observable<any>;
    }
  

}