import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GanttModule, TaskFieldsModel } from '@syncfusion/ej2-angular-gantt';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { ActiviteService } from '../../../services/activite.service';

@Component({
  selector: 'app-gantt-planing',
  standalone: true,
  imports: [
    CommonModule,
    GanttModule,
    ReactiveFormsModule,
  ],
  templateUrl: './gantt-planing.component.html',
  styleUrl: './gantt-planing.component.css'
})
export class GanttPlaningComponent {
  @Input() programme_id!: number;

  jalonForm = new FormGroup({
    site: new FormControl('', Validators.required),
    phase: new FormControl('', Validators.required),
    libelle: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
    responsable: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  })

  users: any[] = [];
  phases: any[] = [];
  sites: any[] = [];
  JResponsable: any;
  JEmail: any;

  Data: Object[] = [];
  DataII: Object[] = [];
  DataTable: Object[] = [];
  ganttData: any[] = []
  bool: boolean = false;
  taskSettings: TaskFieldsModel | undefined;

  constructor(
    private programmeService: ProgrammeServiceService,
    private data: DataServiceService,
    private activiteService: ActiviteService,
  ){}

  ngOnInit() {
    this.getDataPlaning();
    this.taskSettings = {id: 'TaskID', name: 'TaskName', startDate: 'StartDate', endDate: 'EndDate', duration: 'Duration', progress: 'Progress', child: 'subtasks' };
  }

  planingGanttView(){
    this.bool = true;
  }

  planingTableauView(){
    this.bool = false;
  }

  getDataPlaning(){
    this.programmeService.getDataPlaning(this.programme_id).subscribe(
      data => {
        this.DataII = this.groupByPhase(data);
        this.Data = this.transformForGantt(this.DataII);
        this.DataTable = this.transformDataTable(this.DataII);
        console.log('palning data Tableau : ', this.DataTable);
        console.log('palning data Gantt : ', this.Data);
      }, error => {
        console.error('Erreur lors de la récuperation des données !!!!!!', error);
      }
    )
  }

  groupByPhase(data: any[]): any {
    return data.reduce((acc, current) => {
      current.activites.forEach((activite: any) => {
        const phaseName = activite.phase.libelle;
  
        // Si la phase n'existe pas encore dans l'accumulateur, on la crée
        if (!acc[phaseName]) {
          acc[phaseName] = {
            phase_id: activite.phase.id,
            phase_name: phaseName,
            activities: [],
          };
        }
  
        // Ajout de l'activité à la phase correspondante
        acc[phaseName].activities.push({
          id: activite.id,
          libelle: activite.libelle + '. Activité du PTBA : ' + current.libelle,
          date_debut: activite.date_debut,
          date_fin: activite.date_fin,
          budget: activite.budget,
        });
      });
  
      return acc;  // Retour de l'accumulateur
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

  insertJalon(){
    if(this.jalonForm.valid){
      this.activiteService.insertActivite(this.jalonForm).subscribe(
        data => {
          this.closejalonmodal();
          this.getDataPlaning();
        }, error => {
          console.log(error);
        }
      )
    }
  }
  
  onUserSelectJalon(event: any) {
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    if (selectedUser) {
      this.JEmail = selectedUser.email;
      this.JResponsable = selectedUser.name;
    }
  }

  getusers(){
    this.data.getUsers().subscribe(
      data => {
        this.users = data;
      }
    )
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

  getSites(){
    this.activiteService.getSites().subscribe(
      data => {
        this.sites = data;
      }, error => {
        console.log('Erreur lors du chargement des sites !', error);
      }
    )
  }

  getPhases(){
    this.activiteService.getPhases().subscribe(
      data => {
        this.phases = data;
      }, error => {
        console.log('Erreur lors du chargement des phases !', error);
      }
    );
  }
  




}
