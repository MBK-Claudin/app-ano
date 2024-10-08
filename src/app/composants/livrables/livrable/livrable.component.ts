import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-livrable',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './livrable.component.html',
  styleUrl: './livrable.component.css'
})
export class LivrableComponent {
  @Input() programme_id!: number;

}
