import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection} from '@angular/fire/firestore';

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

}