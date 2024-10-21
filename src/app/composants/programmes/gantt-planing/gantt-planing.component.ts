import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { error } from 'console';

@Component({
  selector: 'app-gantt-planing',
  standalone: true,
  imports: [
    CommonModule,
    GanttModule,
  ],
  templateUrl: './gantt-planing.component.html',
  styleUrl: './gantt-planing.component.css'
})
export class GanttPlaningComponent {
  @Input() programme_id!: number;

  Data: Object[] = [];

  constructor(
    private programmeService: ProgrammeServiceService,
  ){}

  ngOnInit() {}

  getDataPlaning(){
    this.programmeService.getDataPlaning(this.programme_id).subscribe(
      data => {
        this.Data = data;
        console.log('palning data : ', this.Data);
      }, error => {
        console.error('Erreur lors de la récuperation des données !!!!!!', error);
      }
    )
  }

}
