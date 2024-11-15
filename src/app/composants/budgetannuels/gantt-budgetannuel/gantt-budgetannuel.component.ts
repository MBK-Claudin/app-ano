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
  TableData: any[] = [];
  DataII: any[] = [];
  bool: boolean = false;

  constructor(
    private budgetannuelService: BudgetannuelServiceService,
  ){}

  ngOniInit(){
    this.getActivite();
  }

  getActivite(){
    this.budgetannuelService.getPlaningData(this.activite_id).subscribe(
      data => {
        this.loader = false;
        this.DataII = data;
        this.Data = this.transformDataToGanttFormat(this.DataII);
        this.TableData = this.transformDataToTableFormat(this.DataII);
        console.log('planning data :', this.Data);
        console.log('planning data :', this.Data);
      }, error => {
        console.log("erreur lors du chargement de l'activité !", error);
      }
    )
  }

  transformDataToGanttFormat(data: any[]): any[] {

    return data.map(phase => {
      const currentDate = new Date();
      const startDate = phase.activites[0]?.date_debut ? new Date(phase.activites[0]?.date_debut) : currentDate;
      const endDate = phase.activites[0]?.date_fin ? new Date(phase.activites[0]?.date_fin) : currentDate;
      const duration = this.calculateDuration(startDate, endDate);
      
      
      const phaseData: any = {
        TaskID: phase.id,
        TaskName: phase.libelle,
        StartDate: startDate,
        EndDate: endDate,
        Duration: duration,
        Progress: this.getPhaseProgress(phase),
        subtasks: phase.activites.map((activite: any) => ({
          TaskID: `${phase.id}-${activite.id}`,
          TaskName: activite.libelle,
          StartDate: new Date(activite.date_debut),
          EndDate: new Date(activite.date_fin),
          Duration: this.calculateDuration(new Date(activite.date_debut), new Date(activite.date_fin)),
          Progress: this.getActivityProgress(activite)
        }))
      };
  
      return phaseData;
    });
  }
  
  calculateDuration(startDate: Date, endDate: Date): number {
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0); // Durée minimale de 0
  }
  
  // Placeholder methods for dynamic progress calculations
  getPhaseProgress(phase: any): number {
    if (!phase.activites || phase.activites.length === 0) {
      return 0; // Retourne 0 si aucune activité n'est présente
    }
  
    // Calculer la progression moyenne des activités de la phase
    const totalProgress = phase.activites.reduce((sum: number, activite: any) => {
      return sum + this.getActivityProgress(activite);
    }, 0);
  
    const averageProgress = totalProgress / phase.activites.length;
    return Math.round(averageProgress); // Arrondir le pourcentage
  }  
  
  getActivityProgress(activite: any): number {
    const startDate = new Date(activite.date_debut);
    const endDate = new Date(activite.date_fin);
    const currentDate = new Date();
  
    // Si la date de début ou de fin n'existe pas, ou si la date actuelle est avant la date de début
    if (!activite.date_debut || !activite.date_fin || currentDate < startDate) {
      return 0;
    }
  
    // Si la date actuelle est au-delà de la date de fin, considérer que l'activité est terminée
    if (currentDate >= endDate) {
      return 100;
    }
  
    // Calculer le pourcentage d'avancement en fonction du temps écoulé
    const totalDuration = this.calculateDuration(startDate, endDate);
    const elapsedDuration = this.calculateDuration(startDate, currentDate);
  
    const progress = (elapsedDuration / totalDuration) * 100;
    return Math.round(Math.min(progress, 100)); // Limiter à un maximum de 100
  }

  transformDataToTableFormat(data: any[]): any[] {
    return data.map(phase => {
      const organizedPhase = {
        libelle: phase.libelle,
        activities: phase.activites.map((activity: any) => ({
          libelle: activity.libelle,
          progress: this.getActivityProgress(activity) // Calcul de progression basé sur l'activité
        }))
      };
      return organizedPhase;
    });
  }

  planingGanttView(){
    this.bool = true;
  }

  planingTableauView(){
    this.bool = false;
  }

  closejalonmodal(){
    const modal = document.getElementById('jalonmodal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  jalonmodal(){
    const modal = document.getElementById('jalonmodal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

}
