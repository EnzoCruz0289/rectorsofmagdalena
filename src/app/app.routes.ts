import { Routes } from '@angular/router';
import { publicGuard, authGuard } from './guards/auth.guard'; 
import { AppComponent } from './app.component';
import { DatasedComponent } from './pagges/datased/datased.component';
import { LoginComponent } from './auth/login/login.component';
import { ConsultationComponent } from './pagges/consultation/consultation.component';

export const routes: Routes = [


  {path:'loginSED', component:LoginComponent},

  {path:'rectores', component:DatasedComponent},

  {path:'sedmag', component:AppComponent, canActivate:[authGuard],

  children:[

    {path:'', redirectTo:'/consulta',pathMatch:'full'},

    {path:'consulta', component:ConsultationComponent, canActivate:[authGuard]},

    { path: '**', redirectTo: '/consulta' }

  ]
 },

 {path:'**', redirectTo: '/rectores'},
];