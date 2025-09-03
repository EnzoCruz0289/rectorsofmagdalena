import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from "rxjs";
import { AuthServicesService } from '../services/auth-services.service';

export const  routerInjection = () => inject(Router);

export const authStateObs$ = () => inject(AuthServicesService).authState$;

export const  authGuard: CanActivateFn = () => {
    const router = routerInjection();
    return authStateObs$().pipe(
        map((user) => {
            if(!user) {
                router.navigateByUrl('consulta');
                return false;
            } else {
                return true;
            }
        })
    );
};

export const publicGuard: CanActivateFn = () => {
    const router =  routerInjection();
    
    return authStateObs$().pipe(
        map((user) => {
            if(user) {
                router.navigateByUrl('loginSED');
                return false;
            }
            return true;
        })
    );
}