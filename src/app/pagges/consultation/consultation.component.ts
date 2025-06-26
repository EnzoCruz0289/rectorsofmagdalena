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
  displayedColumns: string[] = ['municipio', 'namerec', 'ceddocente', 'ied', 'info'];
  filterprest: FilterTsService = inject(FilterTsService);
  firebaseservice = inject(FirebaseService);
  dialog = inject(MatDialog);
  firebaseservicelog = inject(LoginService);
  router = inject(Router)
  dataSource: any[] = [];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    if (filterValue) {
      this.filterprest.getUserFiltered(filterValue).subscribe((data: any[]) => {
        this.dataSource = data;
        console.log('filtro', data)

      });
    } else {
      this.dataSource = [];
      console.log()
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
              <td mat-cell *matCellDef="let element"> <div class="observacion-text">{{element.numied}}</div> </td>
            </ng-container>

            <ng-container matColumnDef="numrec">
              <th mat-header-cell *matHeaderCellDef> NUMERO RECTOR </th>
              <td mat-cell *matCellDef="let element"> <div class="observacion-text">{{element.numrec}}</div> </td>
            </ng-container>

            <ng-container matColumnDef="observacion">
              <th mat-header-cell *matHeaderCellDef> OBSERVACION </th>
              <td mat-cell *matCellDef="let element"> <div class="observacion-text">{{element.observation}}</div> </td>
            </ng-container>

            <<ng-container matColumnDef="cv">
  <th mat-header-cell *matHeaderCellDef> HOJA DE VIDA </th>
  <td mat-cell *matCellDef="let element">
    <a *ngIf="archivoCV" [href]="archivoCV" target="_blank">Descargar</a>
    <span *ngIf="!archivoCV">No disponible</span>
  </td>
</ng-container>

<ng-container matColumnDef="incapa">
  <th mat-header-cell *matHeaderCellDef> INCAPACIDAD </th>
  <td mat-cell *matCellDef="let element">
    <a *ngIf="archivoIncapacidad" [href]="archivoIncapacidad" target="_blank">Descargar</a>
    <span *ngIf="!archivoIncapacidad">No disponible</span>
  </td>
</ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
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
  displayedColumns: string[] = ['cedrec', 'emailied', 'numied', 'numrec', 'observacion', 'cv', 'incapa'];
  dataSourcep: any[] = [];
  archivoCV: string | null = null;
  archivoIncapacidad: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private supabase: SupabaseService
  ) {
    this.dataSourcep = data.prestamos;
  }

  ngOnInit(): void {
    const cedula = this.data?.prestamos?.[0]?.ceddocente;  // <- toma la cédula desde Firebase
    console.log('Buscando archivos para cédula:', cedula);

    if (cedula) {
      this.buscarArchivos(cedula);
    }
  }

  async buscarArchivos(cedula: string) {
    const archivos = await this.supabase.obtenerArchivosPorCedula(cedula);

    this.archivoCV = archivos.cv;
    this.archivoIncapacidad = archivos.incapacidad;

    if (!archivos.cv && !archivos.incapacidad) {
      alert('No se encontraron archivos para esta cédula.');
    }
  }
}