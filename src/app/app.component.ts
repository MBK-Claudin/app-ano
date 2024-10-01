import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ObjectifComponent } from './composants/objectifs/objectif/objectif.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ObjectifComponent,
    CommonModule,
    RouterModule,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-eano';
}
