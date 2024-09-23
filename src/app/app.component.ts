import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ObjectifComponent } from './composants/objectifs/objectif/objectif.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ObjectifComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-eano';

  teste(){
    console.log('Teste');
  }
}
