import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { error } from 'console';

@Component({
  selector: 'app-plan-transformation',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './plan-transformation.component.html',
  styleUrl: './plan-transformation.component.css'
})
export class PlanTransformationComponent {
  @Input() programme_id!:number;

  data: any[] = [];

  constructor(
    private programmeService: ProgrammeServiceService,
  ){}

  ngOnInit(){
    this.getDataPlanTransformation();
  }

  getDataPlanTransformation (){
    this.programmeService.getDataPlanTransformation(this.programme_id).subscribe(
      data => {
        this.data = data;
      }, error => {
        console.error("Erreur lors de la recuperation des données du plan de transformation !!", error);
      }
    )
  }
}
