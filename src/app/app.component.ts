import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObjectifComponent } from './composants/objectifs/objectif/objectif.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ObjectifComponent
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
