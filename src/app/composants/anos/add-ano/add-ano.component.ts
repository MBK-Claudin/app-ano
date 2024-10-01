import { AnoInterface } from './../../../interfaces/ano-interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-ano',
  standalone: true,
  imports: [],
  templateUrl: './add-ano.component.html',
  styleUrl: './add-ano.component.css'
})
export class AddAnoComponent {
  @Input() programme_id!: number;



}
