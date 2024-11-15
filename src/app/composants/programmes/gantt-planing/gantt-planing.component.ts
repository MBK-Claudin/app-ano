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
  DataII: any[] = [];
  DataTable: any[] = [];
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

  getDataPlaning() {
    this.programmeService.getDataPlaning(this.programme_id).subscribe(
      data => {
        this.DataII = data
        this.Data = this.transformDataToGanttFormat(this.DataII);
        this.DataTable = this.transformDataToTableFormat(this.DataII);
      },
      error => {
        console.error('Error retrieving data:', error);
      }
    );
  }
  
  transformDataToGanttFormat(data: any[]): any[] {
    const i = 1;
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
