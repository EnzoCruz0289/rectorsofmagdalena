import { Component, inject } from '@angular/core';
import { FilterTsService } from '../../services/filter.service';
import { FirebaseService } from '../../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css'
})
export class ConsultationComponent {
  displayedColumns: string[] = ['municipio', 'namerec', 'cedrec', 'ied'];
  readonly filterprest: FilterTsService = inject(FilterTsService);
  readonly firebaseservice = inject(FirebaseService);
  readonly dialog = inject(MatDialog);

  dataSource: any[] = [];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    if (filterValue) {
      this.filterprest.getUserFiltered(filterValue).subscribe((data: any[]) => {
        this.dataSource = data;
      });
    } else {
      this.dataSource = [];
    }
  }
}
