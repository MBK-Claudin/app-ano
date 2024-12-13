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

<<<<<<< Updated upstream
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
=======
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

  jalonmodal(){
    const modal = document.getElementById('jalonmodal');
    if (modal != null) {
      modal.style.display = 'block';
    }
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


>>>>>>> Stashed changes

}
