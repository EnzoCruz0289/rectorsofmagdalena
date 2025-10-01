import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthServicesService  {
private auth: Auth=inject(Auth)
readonly authState$ = authState(this.auth);
}
