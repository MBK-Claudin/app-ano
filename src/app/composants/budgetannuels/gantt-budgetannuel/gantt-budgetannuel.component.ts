import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GanttModule, TaskFieldsModel } from '@syncfusion/ej2-angular-gantt';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';

@Component({
  selector: 'app-gantt-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
    GanttModule,
  ],
  templateUrl: './gantt-budgetannuel.component.html',
  styleUrl: './gantt-budgetannuel.component.css'
})
export class GanttBudgetannuelComponent {
  @Input() activite_id!:number;

  jalons:any[] = [];
  responsables:any[] = [];
  loader = true;
  anos: any[] = [];
  activite: any;

  taskSettings: TaskFieldsModel | undefined;
  Data: object[] = [];
  DataII: any[] = [];
  ganttData: Object[] = [];

  constructor(
    private budgetannuelService: BudgetannuelServiceService,
  ){}

  ngOniInit(){
    this.getActivite();
  }

  getActivite(){
    this.budgetannuelService.getOneActivite(this.activite_id).subscribe(
      data => {
        this.loader = false;
        this.activite = data;
        this.jalons = data.activites;
        this.responsables = data.users;
        this.anos = data.anos;
        this.DataII = this.groupByPhase(this.jalons);
        this.Data = this.transformForGantt(this.DataII);
        console.log('Organisation des données', this.DataII);
        console.log('Transmation des données', this.Data);
      }, error => {
        console.log("erreur lors du chargement de l'activité !", error);
      }
    )
  }

  groupByPhase(data: any[]): any {
    return data.reduce((acc, current) => {
      const phaseName = current.phase.libelle;

      // Si la phase n'existe pas encore dans l'accumulateur, on la crée
      if (!acc[phaseName]) {
        acc[phaseName] = {
          phase_id: current.phase.id,
          phase_name: phaseName,
          activities: [],
        };
      }

      // Ajout de l'activité à la phase correspondante
      acc[phaseName].activities.push({
        id: current.id,
        libelle: current.libelle,
        date_debut: current.date_debut,
        date_fin: current.date_fin,
        budget: current.budget,
      });

      return acc;
    }, {});
  }

  transformForGantt(groupedData: any): any[] {
    this.ganttData = [];

    Object.keys(groupedData).forEach((phaseName, index) => {
      const phase = groupedData[phaseName];

      // Ajouter la phase comme une tâche parent
      this.ganttData.push({
        TaskID: phase.phase_id,
        TaskName: phase.phase_name,
        StartDate: new Date(phase.activities[0].date_debut),
        EndDate: new Date(phase.activities[phase.activities.length - 1].date_fin),
        isParent: true,
        subtasks: phase.activities.map((activity: { libelle: string, date_debut: string, date_fin: string, budget: string }, i: number) => ({
          TaskID: `${phase.phase_id}-${i+1}`,
          TaskName: activity.libelle,
          StartDate: new Date(activity.date_debut),
          EndDate: new Date(activity.date_fin),
          Budget: activity.budget,
          isParent: false,
        })),
      });
    });

    return this.ganttData;
  }

}
