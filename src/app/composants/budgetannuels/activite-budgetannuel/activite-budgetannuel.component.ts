import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { AnoService } from '../../../services/ano.service';
import { ActiviteService } from '../../../services/activite.service';
import { GanttModule, TaskFieldsModel } from '@syncfusion/ej2-angular-gantt';
import { error } from 'console';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';
import { ObjectEncodingOptions } from 'fs';
import { AnoBudgetannuelComponent } from '../ano-budgetannuel/ano-budgetannuel.component';
import { JalonBudgetannuelComponent } from '../jalon-budgetannuel/jalon-budgetannuel.component';
import { GanttBudgetannuelComponent } from '../gantt-budgetannuel/gantt-budgetannuel.component';
import { PlaningTableauBudgetannuelComponent } from '../planing-tableau-budgetannuel/planing-tableau-budgetannuel.component';
import { ResponsablesActivitebudegtannuelComponent } from '../responsables-activitebudegtannuel/responsables-activitebudegtannuel.component';

@Component({
  selector: 'app-activite-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GanttModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    AnoBudgetannuelComponent,
    JalonBudgetannuelComponent,
    GanttBudgetannuelComponent,
    PlaningTableauBudgetannuelComponent,
    ResponsablesActivitebudegtannuelComponent,
  ],
  templateUrl: './activite-budgetannuel.component.html',
  styleUrl: './activite-budgetannuel.component.css'
})
export class ActiviteBudgetannuelComponent {
  @ViewChild('doc') documents: any;
  loader = true;
  bool = true;
  jalons:any[] = [];
  responsables:any[] = [];
  anos: any[] = [];

  phases: any[] = [];
  sites: any[] = [];
  nothing: object[] = [];
  activite: any;

  activite_id: any;
  users: any[] = [];
  indexDoc: number = 0;
  indextEvent: number = 0;

  titres: string[] = [];
  files: File[] = [];
  fileToAdd: File | null = null;

  deleteano: any;
  deleteano_id: any;
  userid: any;

  isAnoList: boolean = true;
  isJalonList: boolean = false;
  isGantt: boolean = false;
  isProgressTable: boolean = false;
  
  taskSettings: TaskFieldsModel | undefined;
  Data: object[] = [];
  DataII: any[] = [];
  ganttData: Object[] = [];
  DataTable: any[] = [];
  
  constructor(
    private router: ActivatedRoute,
    private data: DataServiceService,
    private ano: AnoService,
    private activiteService: ActiviteService,
    private budgetannuelService: BudgetannuelServiceService,
  ){}

  ngOnInit(){
    this.activite_id = this.router.snapshot.paramMap.get('id');
    this.indexDoc = 0;
    this.indextEvent = 0;
    this.getActivite();
    this.taskSettings = {id: 'TaskID', name: 'TaskName', startDate: 'StartDate', endDate: 'EndDate', duration: 'Duration', progress: 'Progress', child: 'subtasks' };
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
        this.DataTable = this.transformDataTable(this.DataII);
        console.log('Organisation des données', this.DataII);
        console.log('Transmation des données', this.Data);
        console.log('Tableau des données', this.DataTable);
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

  transformDataTable(originalData: any): any[] {
    const transformedPhases = [];
  
    // Parcours de chaque phase dans l'objet original
    for (const phaseKey in originalData) {
      if (originalData.hasOwnProperty(phaseKey)) {
        const phase = originalData[phaseKey];
  
        // Création d'un objet pour la phase avec son libellé et ses activités
        const transformedPhase = {
          libelle: phase.phase_name,
          activities: phase.activities.map((activity: any) => ({
            libelle: activity.libelle,
            date_debut: activity.date_debut,
            date_fin: activity.date_fin,
            progress: this.calculateProgress(activity.date_debut, activity.date_fin),
          })),
        };
  
        // Ajout de la phase transformée dans le tableau final
        transformedPhases.push(transformedPhase);
      }
    }
  
    return transformedPhases;
  }

  calculateProgress(dateDebut: string, dateFin: string): number {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const today = new Date();
  
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = today.getTime() - startDate.getTime();
  
    if (totalDuration <= 0) return 100;  // Si la phase est terminée ou a une mauvaise configuration
    const progress = (elapsedDuration / totalDuration) * 100;
    return progress > 100 ? 100 : progress < 0 ? 0 : progress;  // Garde la progression entre 0 et 100
  }


  removeFile(index: number) {
    this.files.splice(index, 1); // Supprime le fichier de la liste
  }

}
