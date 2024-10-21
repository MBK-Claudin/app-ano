import { BudgetAnnuel } from './../../../interfaces/budget-annuel';
import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GanttModule, TaskFieldsModel } from '@syncfusion/ej2-angular-gantt';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { error } from 'console';
import { subscribe } from 'diagnostics_channel';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-planing-gantt',
  standalone: true,
  imports: [
    CommonModule,
    GanttModule,
    RouterModule,
  ],
  templateUrl: './planing-gantt.component.html',
  styleUrl: './planing-gantt.component.css'
})
export class PlaningGanttComponent {

  data: object[] = [];
  planingData: any[] = [];
  Data: object[] = [];
  id: any;

  taskSettings: TaskFieldsModel | undefined;

  constructor(
    private programmeService: ProgrammeServiceService,
    private router: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.getDataPlaning();
    this.id = this.router.snapshot.paramMap.get('id');
    this.taskSettings = {id: 'TaskID', name: 'TaskName', startDate: 'StartDate', endDate: 'EndDate', duration: 'Duration', progress: 'Progress', child: 'subtasks' };
  }


  getDataPlaning() {
    this.programmeService.planingData(this.router.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.planingData = data;
        this.cdr.detectChanges();
        
        for (let i = 0; i < this.planingData.length; i++) {
          for (let j = 0; j < this.planingData[i].composants.length; j++) {
            let souscomposantsData = []; // Collecte des sous-composants
  
            for (let k = 0; k < this.planingData[i].composants[j].souscomposants.length; k++) {
              let activitesData = []; // Collecte des activités
  
              for (let l = 0; l < this.planingData[i].composants[j].souscomposants[k].activitesbudgetannuel.length; l++) {
                let activite = this.planingData[i].composants[j].souscomposants[k].activitesbudgetannuel[l];
                activitesData.push({
                  TaskID: l+1,
                  TaskName: activite.libelle,
                  StartDate: activite.date_debut,
                  EndDate: activite.date_fin
                });
              }
  
              let souscomposant = this.planingData[i].composants[j].souscomposants[k];
              souscomposantsData.push({
                TaskID: k+1,
                TaskName: souscomposant.libelle,
                StartDate: souscomposant.activitesbudgetannuel[0].date_debut,
                EndDate: souscomposant.activitesbudgetannuel[souscomposant.activitesbudgetannuel.length - 1].date_fin,
                subtasks: activitesData // Ajout des activités à chaque sous-composant
              });
            }
  
            let composant = this.planingData[i].composants[j];

            this.Data.push({
              TaskID: j+1,
              TaskName: composant.libelle,
              StartDate: composant.souscomposants[0].activitesbudgetannuel[0].date_debut,
              EndDate: composant.souscomposants[composant.souscomposants.length - 1].activitesbudgetannuel[composant.souscomposants[composant.souscomposants.length - 1].activitesbudgetannuel.length - 1].date_fin,
              subtasks: souscomposantsData // Ajout des sous-composants à chaque composant
            });
          }
        }
  
        console.log('data planing : ', this.Data);
      }, error => {
        console.error(error);
      }
    );
  }

  goBack(){
    this.location.back()
  }
  

}
