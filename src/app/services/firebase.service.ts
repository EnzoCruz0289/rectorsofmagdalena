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
    
    // async createPrestamo(usuario:any){
    //   let fechaPars = new Date();
    //   let mes = (fechaPars.getMonth() + 1).toString().padStart(2, '0'); 
    //   let mes1 = fechaPars.getMonth() + 1; 
    //   let dia = fechaPars.getDate().toString().padStart(2, '0');
    //   let dia1 = fechaPars.getDate();
    //   let año = fechaPars.getFullYear();
    //   let año1 = fechaPars.getFullYear();
    //   let hora = fechaPars.getHours().toString().padStart(2, '0');
    //   let min = fechaPars.getMinutes().toString().padStart(2, '0');
      
    //   let fechaCompleta = `${dia}/${mes}/${año} ${hora}:${min}`;
    //   let fechaFilro = `${mes1}/${dia1}/${año1}`;
  
    //   usuario.fechaRegistrocomp = fechaCompleta;
    //   usuario.fechaRegistro = fechaFilro;
  
    //   return await addDoc(this._collection, usuario);
    //   }

}