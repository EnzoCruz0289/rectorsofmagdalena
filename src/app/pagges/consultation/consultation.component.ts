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
  displayedColumns: string[] = ['municipio', 'namerec', 'ceddocente', 'ied', 'info', ];
  filterprest: FilterTsService = inject(FilterTsService);
  firebaseservice = inject(FirebaseService);
  dialog = inject(MatDialog);
  firebaseservicelog = inject(LoginService);
  loaderService = inject(LoaderService)
  router = inject(Router)
  dataSource: any[] = [];
  year = new Date().getFullYear();
  totalIncapacidades: number = 0;

  ngOnInit() {
    this.obtenerTotalDesdeFirebase();
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

    console.log('Start:', startDate, 'End:', endDate);

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
        console.log(`Dialog result: ${result}`);
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

          <ng-container matColumnDef="cedrec">
            <th mat-header-cell *matHeaderCellDef> CEDULA DEL RECTOR </th>
            <td mat-cell *matCellDef="let element"> {{element.cedrec}} </td>
          </ng-container>

          <ng-container matColumnDef="emailied">
            <th mat-header-cell *matHeaderCellDef> CORREO INSTITUCION </th>
            <td mat-cell *matCellDef="let element"> {{element.emailied}} </td>
          </ng-container>

          <ng-container matColumnDef="numied">
            <th mat-header-cell *matHeaderCellDef> NUMERO IED </th>
            <td mat-cell *matCellDef="let element">
              <div class="observacion-text">{{element.numied}}</div>
            </td>
          </ng-container>

          <ng-container matColumnDef="numrec">
            <th mat-header-cell *matHeaderCellDef> NUMERO RECTOR </th>
            <td mat-cell *matCellDef="let element">
              <div class="observacion-text">{{element.numrec}}</div>
            </td>
          </ng-container>

          <ng-container matColumnDef="observacion">
            <th mat-header-cell *matHeaderCellDef> OBSERVACION </th>
            <td mat-cell *matCellDef="let element">
              <div class="observacion-text">{{element.observation}}</div>
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
              <th>Fecha</th>
              <th>Días de incapacidad</th>
              <th>Incapacidad</th>
              <th>Hoja de vida</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let inc of listaIncapacidades">
              <td>{{ inc.fecha_incapacidad | date: 'yyyy-MM-dd' }}</td>
              <td>{{ inc.dias_incapacidad }}</td>
              <td>
                <a *ngIf="inc.archivo_1_url" [href]="inc.archivo_1_url" target="_blank">Descargar</a>
                <span *ngIf="!inc.archivo_1_url">No disponible</span>
              </td>
              <td>
                <a *ngIf="inc.archivo_2_url" [href]="inc.archivo_2_url" target="_blank">Descargar</a>
                <span *ngIf="!inc.archivo_2_url">No disponible</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- FIN NUEVA TABLA -->

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
  displayedColumns: string[] = ['cedrec', 'emailied', 'numied', 'numrec', 'observacion',];
  dataSourcep: any[] = [];
  archivoCV: string | null = null;
  archivoIncapacidad: string | null = null;
  listaIncapacidades: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private supabase: SupabaseService
  ) {
    this.dataSourcep = data.prestamos;
  }

  ngOnInit(): void {
    const cedula = this.data?.prestamos?.[0]?.ceddocente;  // <- toma la cédula desde Firebase
    // console.log('Buscando archivos para cédula:', cedula);

    if (cedula) {
      this.buscarArchivos(cedula);
    }
  }

  async buscarArchivos(cedula: string) {
    const archivos = await this.supabase.obtenerArchivosPorCedula(cedula);
    this.archivoCV = archivos.cv;
  
    const incapacidades = await this.supabase.obtenerTodasIncapacidadesPorCedula(cedula);
    this.listaIncapacidades = incapacidades;
  
    if (!archivos.cv && incapacidades.length === 0) {
      alert('No se encontraron archivos para esta cédula.');
    }
  }
}