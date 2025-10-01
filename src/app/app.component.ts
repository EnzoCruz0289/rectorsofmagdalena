import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { LoaderService } from './services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SED';  
  loading$!: Observable<boolean>;  // usa el “!” para decirle a TS que la inicializarás tú

  constructor(private loaderService: LoaderService) {
    this.loading$ = this.loaderService.loading$;

  }
}
