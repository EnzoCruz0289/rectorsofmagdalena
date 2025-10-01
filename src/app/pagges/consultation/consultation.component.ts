import { Component, Inject, OnInit, inject } from '@angular/core';
import { FilterTsService } from '../../services/filter.service';
import { FirebaseService } from '../../services/firebase.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SupabaseService } from '../../services/supabase.service';
import { LoginService } from '../../services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css'
})
export class ConsultationComponent {
  displayedColumns: string[] = ['fechaRegistrocomp', 'municipio', 'nombreDocente', 'cedulaDocente' , 'ied', 'numeroIncapacidad', 'numsac', 'info' ];
  filterprest: FilterTsService = inject(FilterTsService);
  firebaseservice = inject(FirebaseService);
  dialog = inject(MatDialog);
  firebaseservicelog = inject(LoginService);
  loaderService = inject(LoaderService)
  router = inject(Router)
  dataSource: any[] = [];
  year = new Date().getFullYear();
  totalIncapacidades: number = 0;
  claveIngresada: string='';
  claveActual: string= '';


  ngOnInit() {
    this.obtenerTotalDesdeFirebase();
    this.firebaseservice.getPassword()
  .then(clave => {
    if (clave) {
      this.claveActual = clave;
    } else {
      console.warn('No hay clave guardada en la base de datos');
    }
  })
  .catch(error => {
    console.error('Error obteniendo clave:', error);
  });
  }

  async obtenerTotalDesdeFirebase() {
  this.totalIncapacidades = await this.firebaseservice.contarTodasIncapacidades();
}
  
  applyFilter(filterValue: string) {
    this.loaderService.show();

    filterValue = filterValue.trim();

    if (filterValue) {
      this.filterprest.getUserFiltered(filterValue).subscribe({next:(data: any[]) => {
        this.dataSource = data;
        this.loaderService.hide(); // 👈 mover aquí
        // console.log('filtro', data)

      },
      error: (error) => {
        // console.error('Error en filtro:', error);
        this.loaderService.hide(); // 👈 también apagar en error
      },}
      );

    } else {
      this.dataSource = [];
      this.loaderService.hide(); // 👈 Si no hay filtro, apaga el loader
    }
    
  }

  applyFilterFech(startInput: string, endInput: string) {
    this.loaderService.show();
    const startDate = new Date(startInput);
    const endDate = new Date(endInput);
    endDate.setHours(23, 59, 59, 999);

    // console.log('Start:', startDate, 'End:', endDate);

    if (startInput && endInput) {
      this.filterprest.getFechFiltered(startDate, endDate).subscribe(data => {
        this.dataSource = data;
        this.loaderService.hide(); // 👈 mover aquí
      });
      
    } else {
      this.dataSource = [];
      this.loaderService.hide(); // 👈 Si no hay filtro, apaga el loader
    }
  }

  sendPassword(){
    if(!this.claveIngresada.trim()){
      console.warn('Debe ingresar una clave');
      return;
    }else {

      this.firebaseservice.savepassword(this.claveIngresada);
      console.log("Clave guardada:", this.claveIngresada);

      Swal.fire({
        icon: 'success',
        title: 'CAMBIO REALIZADO',
        text: 'EL CAMBIO DE CONTRASEÑA FUE EXITOSO'
      });

    }
    this.claveIngresada = '';
  }
  

  onClick() {
    this.firebaseservicelog.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch();
  }

  openDialog(userId: string) {
    this.firebaseservice.getUserById(userId).pipe(take(1)).subscribe(data => {
      const dialogRef = this.dialog.open(DialogContentComponent, {
        data: {
          prestamos: [data],
          docId: userId,
        },
        width: '90%',
        height: '90%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        panelClass: 'full-screen-dialog'
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
      });
    });
  }
}


@Component({
  selector: 'dialog-content-component',
  standalone: true,
  template: `
  <mat-card class="container my-5" style="background-color: rgba(0, 0, 0, 0.027);">
  <mat-card-content>
    <div class="d-flex justify-content-center">
      <h1 mat-dialog-title>Información adicional</h1>
    </div>

    <div mat-dialog-content>
      <div class="table-responsive">
        <table mat-table [dataSource]="dataSourcep" class="mat-elevation-z8 table container">
          
          <ng-container matColumnDef="tipoTramiteDocente">
            <th mat-header-cell *matHeaderCellDef> Tipo de tramite </th>
            <td mat-cell *matCellDef="let element">
              <div class="observacion-text">{{element.tipoTramiteDocente}}</div>
            </td>
          </ng-container>

          <ng-container matColumnDef="cargo">
            <th mat-header-cell *matHeaderCellDef> Cargo </th>
            <td mat-cell *matCellDef="let element"> {{element.cargo}} </td>
          </ng-container>

          <ng-container matColumnDef="tipoVinculacion">
            <th mat-header-cell *matHeaderCellDef> Tipo de vinculacion </th>
            <td mat-cell *matCellDef="let element"> {{element.tipoVinculacion}} </td>
          </ng-container>

          <ng-container matColumnDef="tipoIncapacidad">
            <th mat-header-cell *matHeaderCellDef> Tipo de incapacidad </th>
            <td mat-cell *matCellDef="let element">
              <div class="observacion-text">{{element.tipoIncapacidad}}</div>
            </td>
          </ng-container>

          <ng-container matColumnDef="areaEducativa">
            <th mat-header-cell *matHeaderCellDef> OBSERVACION </th>
            <td mat-cell *matCellDef="let element">
              <div class="observacion-text">{{element.areaEducativa}}</div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>

    <!-- NUEVA TABLA PARA HISTORIAL DE INCAPACIDADES -->
    <div class="mt-5" *ngIf="listaIncapacidades.length > 0">
      <h3 class="text-center">Historial de incapacidades</h3>
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha Registro</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Nombre Docente</th>
              <th>Cédula Reemplazo</th>
              <th>Tipo de Tramite</th>
              <th>Archivo incapacidad</th>
              <th>Archivo CV</th>
              <th>Días</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let inc of listaIncapacidades">
              <td>{{ inc.incapacidadId }}</td>
              <td>{{ inc.fecha_incapacidad | date: 'yyyy-MM-dd' }}</td>
              <td>{{ inc.fechaInicio | date: 'yyyy-MM-dd' }}</td>
              <td>{{ inc.fechaFin | date: 'yyyy-MM-dd' }}</td>
              <td>{{ inc.nombre_docente }}</td>
              <td>{{ inc.cedulaRemplazo }}</td>
              <td>{{ inc.tipo_docente }}</td>
              <td>
                <a *ngIf="inc.archivo_1_url" [href]="inc.archivo_1_url" target="_blank">Descargar</a>
                <span *ngIf="!inc.archivo_1_url">No disponible</span>
              </td>
              <td>
                <a *ngIf="inc.archivo_2_url" [href]="inc.archivo_2_url" target="_blank">Descargar</a>
                <span *ngIf="!inc.archivo_2_url">No disponible</span>
              </td>
              <td>{{ inc.dias_incapacidad }}</td>
            </tr>
          </tbody>
          <tfoot>
    <tr>
      <th colspan="9">Total</th>
      <th>{{ totalDias }}</th>
    </tr>
  </tfoot>
        </table>
      </div>
    </div>
  </mat-card-content>
</mat-card>
  `,
  styles: [`
    .observacion-text {
      width: 150px;
    }
  `],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
  ]
})
export class DialogContentComponent implements OnInit {
  displayedColumns: string[] = ['cargo', 'tipoVinculacion', 'tipoIncapacidad', 'tipoTramiteDocente', 'areaEducativa',];
  dataSourcep: any[] = [];
  archivoCV: string | null = null;
  archivoIncapacidad: string | null = null;
  listaIncapacidades: any[] = [];
  totalDias = 0;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private supabase: SupabaseService,
    private firebaseService: FirebaseService,
  ) {
    this.dataSourcep = data.prestamos;
  }
  
  async buscarArchivos(cedula: string) {
    // console.log("📌 Buscando archivos para cédula:", cedula);
    const { incapacidades, totalDias } = await this.firebaseService.obtenerIncapacidadesPorCedula(cedula);
    
  
    const incapacidadesSupabase = await this.supabase.obtenerTodasIncapacidadesPorCedula(cedula);
   
    const archivoCV = await this.supabase.obtenerArchivosPorCedula(cedula);
    this.archivoCV = archivoCV?.cv || null;
  
    const normalizarFecha = (fecha: string) =>
      new Date(fecha).toISOString().split('T')[0];
  
    // 4️⃣ Unir info por fecha normalizada
     this.listaIncapacidades = incapacidades.map(incFb => {
      const match = incapacidadesSupabase.find(
        incSb => incSb.incapacidadId === incFb.incapacidadId // 👈 unión exacta
      );

      return {
        ...incFb,
        archivo_1_url: match?.archivo_1_url || null,
        archivo_2_url: match?.archivo_2_url || null,
      };
    });

    
    this.totalDias = totalDias;
    // 5️⃣ Ordenar por fecha descendente
    this.listaIncapacidades.sort((a, b) => {
      return new Date(b.fecha_incapacidad).getTime() - new Date(a.fecha_incapacidad).getTime();
    });
  }
  ngOnInit(): void {
    const cedula = this.data?.prestamos?.[0]?.cedulaDocente;  // <- toma la cédula desde Firebase
    // console.log('Buscando archivos para cédula:', cedula);
    
    if (cedula) {
      this.buscarArchivos(cedula);
    }
  }
  
}