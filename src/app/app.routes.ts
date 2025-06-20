import { Routes } from '@angular/router';
import { ConsultationComponent } from './pagges/consultation/consultation.component';
import { DatasedComponent } from './pagges/datased/datased.component';

export const routes: Routes = [
    {path:'consulta', component:ConsultationComponent},
    {path:'data', component:DatasedComponent}
];
